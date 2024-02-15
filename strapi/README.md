# Setup
To setup run
```
pnpm install
```
You need to copy .env.example to .env for it to work. **DON'T RENAME IT!**
To run strapi:
```
pnpm run develop
```

To import the shared data run:
```
pnpm run strapi import -- -f strapi-mock-data.tar.gz
```
Make sure you don't unzip the shared file (it's available under files in the teams).
Make sure the mock data is in the /strapi/ folder
