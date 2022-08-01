#!/bin/bash

if ! [ -x "$(command -v DOCKER_HOST="ssh://root@185.182.105.237" docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

domains=(lotto360.io www.lotto360.io trade-signal.net www.trade-signal.net)
rsa_key_size=4096
data_path="./data/certbot"
email="dead4game@gmail.com" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

echo "### Creating dummy certificate for $domains ..."
path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path/conf/live/$domains"
# if throw nofile exist error make /etc/letsencrypt/live/$domains folders in container
DOCKER_HOST="ssh://root@185.182.105.237" docker-compose run --rm --entrypoint "mkdir -p $path" certbot
DOCKER_HOST="ssh://root@185.182.105.237" docker-compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout '$path/privkey.pem' \
    -out '$path/fullchain.pem' \
    -subj '/CN=localhost'" certbot
echo


echo "### Starting nginx ..."
DOCKER_HOST="ssh://root@185.182.105.237" docker-compose up --force-recreate -d nginx
echo

echo "### Deleting dummy certificate for $domains ..."
DOCKER_HOST="ssh://root@185.182.105.237" docker-compose run --rm --entrypoint "\
  rm -Rf /etc/letsencrypt/live/$domains && \
  rm -Rf /etc/letsencrypt/archive/$domains && \
  rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
echo

echo "### Requesting Lets Encrypt certificate for $domains ..."
#Join $domains to -d args
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

DOCKER_HOST="ssh://root@185.182.105.237" docker-compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot
echo

echo "### Reloading nginx ..."
DOCKER_HOST="ssh://root@185.182.105.237" docker-compose exec nginx nginx -s reload
rm -rf data