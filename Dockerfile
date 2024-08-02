# Gunakan image Bun resmi
FROM oven/bun

# Set work directory
WORKDIR /app

# Salin file package.json dan src
COPY package.json ./
COPY src ./src

# Install dependencies
RUN bun install

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["bun", "run", "--hot", "src/index.ts"]
