Encrypting data in a GraphQL application involves securing both the data in transit (between the client and server) and the data at rest (stored in the database). Here’s how you can implement encryption in a GraphQL environment:

### 1. **Encryption in Transit**

Data in transit can be secured using HTTPS and other encryption methods. Here's how to ensure that your GraphQL API communications are encrypted:

- **Use HTTPS**: 
  - Ensure that your GraphQL server and client communicate over HTTPS. This encrypts the data between the client and server, preventing man-in-the-middle attacks.
  - Obtain an SSL/TLS certificate from a trusted Certificate Authority (CA) and configure your server to use it.

- **Transport Layer Security (TLS)**:
  - Make sure TLS (version 1.2 or higher) is enforced on your server. TLS is the protocol behind HTTPS and ensures that all communication is encrypted.

- **WebSocket Security**:
  - If you’re using GraphQL subscriptions (which typically use WebSockets), ensure that you’re using `wss://` instead of `ws://` to secure WebSocket connections.

### 2. **Encryption at Rest**

To protect sensitive data stored in your database, you can use encryption at rest. This involves encrypting the data before storing it and decrypting it when accessing it.

- **Field-Level Encryption**:
  - Encrypt sensitive fields (e.g., passwords, personal information) before saving them to the database. You can use libraries such as `crypto` in Node.js.
  - Example using Node.js `crypto` module:
    ```javascript
    const crypto = require('crypto');

    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    function encrypt(text) {
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }

    function decrypt(text) {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    // Example usage:
    const encrypted = encrypt("Sensitive Data");
    console.log("Encrypted:", encrypted);

    const decrypted = decrypt(encrypted);
    console.log("Decrypted:", decrypted);
    ```

- **Database-Level Encryption**:
  - Some databases offer built-in encryption features. For example, PostgreSQL provides Transparent Data Encryption (TDE) and column-level encryption.
  - You can configure the database to encrypt certain columns, ensuring that sensitive data is stored securely.

- **Encrypting JWTs**:
  - If you are using JSON Web Tokens (JWTs) for authentication, ensure they are signed and encrypted. Use libraries like `jsonwebtoken` in Node.js and consider using JWT encryption (JWE) if the payload contains sensitive data.
  - Example of signing a JWT:
    ```javascript
    const jwt = require('jsonwebtoken');

    const payload = { userId: "1234" };
    const secret = "supersecretkey";

    const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
    console.log("Signed JWT:", token);
    ```

### 3. **End-to-End Encryption**

End-to-end encryption (E2EE) ensures that data is encrypted on the client side before being sent to the server, and only the intended recipient can decrypt it.

- **Client-Side Encryption**:
  - Before sending sensitive data to your GraphQL server, encrypt it on the client side.
  - Example using Web Crypto API in the browser:
    ```javascript
    async function encryptData(data, key) {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(data);
        const iv = crypto.getRandomValues(new Uint8Array(16));

        const encryptedData = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            encodedData
        );

        return { iv, encryptedData };
    }

    async function decryptData(encryptedData, key, iv) {
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            encryptedData
        );

        const decoder = new TextDecoder();
        return decoder.decode(decryptedData);
    }

    // Usage example:
    const key = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    const { iv, encryptedData } = await encryptData("Sensitive Info", key);
    console.log("Encrypted Data:", encryptedData);

    const decryptedData = await decryptData(encryptedData, key, iv);
    console.log("Decrypted Data:", decryptedData);
    ```

- **Public Key Infrastructure (PKI)**:
  - For more advanced use cases, implement PKI for encrypting data with a public key on the client side and decrypting it with a private key on the server.

### 4. **Handling Encrypted Data in GraphQL Resolvers**

When working with encrypted data in your GraphQL resolvers, ensure that:

- **Encryption/Decryption Logic**: 
  - Decrypt data as soon as it is retrieved from the database within the resolver.
  - Encrypt data before storing it in the database within the resolver.

- **Example in Resolver**:
  ```javascript
  const resolvers = {
      Query: {
          getSensitiveData: async (_, { id }, { dataSources }) => {
              const encryptedData = await dataSources.db.getSensitiveData(id);
              return decrypt(encryptedData);
          }
      },
      Mutation: {
          saveSensitiveData: async (_, { data }, { dataSources }) => {
              const encryptedData = encrypt(data);
              return dataSources.db.saveSensitiveData(encryptedData);
          }
      }
  };
  ```

### Summary

Encrypting data in a GraphQL application involves securing data both in transit using HTTPS and TLS, and at rest using field-level encryption or database-level encryption. For maximum security, consider implementing end-to-end encryption where the data is encrypted on the client side before transmission. Always manage encryption keys securely, and ensure that decryption only occurs in secure environments, typically on the server side.