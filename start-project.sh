#!/bin/bash

# Navegar a la carpeta backend
echo "Navigating to backend folder..."
cd backend

# Instalar dependencias en backend
echo "Installing backend dependencies..."
npm install

# Ejecutar las migraciones, el seed y luego iniciar el servidor
echo "Running migrations, seeding the database, and starting backend server..."
npm run migration:dev
npm run seed
npm run dev &

# Almacenar el PID del backend server
BACKEND_PID=$!

# Navegar a la carpeta frontend
echo "Navigating to frontend folder..."
cd ../frontend

# Instalar dependencias en frontend
echo "Installing frontend dependencies..."
npm install

# Iniciar el servidor de desarrollo del frontend
echo "Starting frontend server..."
npm start &

# Almacenar el PID del frontend server
FRONTEND_PID=$!

# Esperar a que ambos servidores se terminen
echo "Servers are running. To stop them, use 'kill $BACKEND_PID $FRONTEND_PID'"
wait $BACKEND_PID $FRONTEND_PID
