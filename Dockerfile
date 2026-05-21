FROM nginx:alpine

# Remover configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copiar build da aplicação
COPY dist /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Opcional: adicionar autenticação básica
# RUN apk add --no-cache apache2-utils
# RUN htpasswd -bc /etc/nginx/.htpasswd admin senha-segura

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]