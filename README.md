# Angular-Marvels

Repositório quase concluído.

OBS:
Para iniciar a aplicação:
```
npm start
```

Para iniciar o servidor que irá otimizar a performance e adicionar funcionalidades extras:

- Servidor propriamente dito:
    - /Angular-Marvels/nodejs
        ```
        node server.js
        ```

- Databases:
    - Cache:
        - /Angular-Marvels/redis/redis-7.0.9
            ```
            src/redis-server redis.conf
            ```

    - Consultas:
        - (Instalado localmente no Pop.OS [Ubuntu])
        ```
        sudo systemctl start mongod
        sudo systemctl status mongod
        ```