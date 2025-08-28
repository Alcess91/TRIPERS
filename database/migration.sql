-- Migration SQL pour TRIPERS Auth System
-- À exécuter sur votre base Neon Postgres

-- Créer la table users si elle n'existe pas
CREATE TABLE IF NOT EXISTS users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  avatar_url TEXT NULL,
  
  -- Champs profil pour onboarding
  first_name TEXT NULL,
  last_name TEXT NULL,
  hobbies TEXT NULL,
  country TEXT NULL,
  languages TEXT[] NULL,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ajouter les colonnes si elles n'existent pas (pour migration)
DO $$ 
BEGIN
  -- Vérifier et ajouter first_name
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='first_name') THEN
    ALTER TABLE users ADD COLUMN first_name TEXT NULL;
  END IF;
  
  -- Vérifier et ajouter last_name
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='last_name') THEN
    ALTER TABLE users ADD COLUMN last_name TEXT NULL;
  END IF;
  
  -- Vérifier et ajouter hobbies
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='hobbies') THEN
    ALTER TABLE users ADD COLUMN hobbies TEXT NULL;
  END IF;
  
  -- Vérifier et ajouter country
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='country') THEN
    ALTER TABLE users ADD COLUMN country TEXT NULL;
  END IF;
  
  -- Vérifier et ajouter languages
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='languages') THEN
    ALTER TABLE users ADD COLUMN languages TEXT[] NULL;
  END IF;
END $$;

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
