# Garajul cu Bere

Platformă premium construită cu `Next.js`, `TailwindCSS`, `Framer Motion`, `Prisma PostgreSQL/Neon` și autentificare pe credentials cu sesiune JWT în cookie `httpOnly`.

## Include

- Home, Menu, Events, Gallery, Contact
- Login, Register, Logout
- Dashboard utilizator cu `My Tickets`
- Checkout bilet legat de cont
- Validare CNP românesc
- Admin panel pentru creare, editare, ștergere evenimente și vizualizare ticket purchases
- Seed automat pentru evenimente și admin

## Rulare locală

1. Copiază `.env.example` în `.env`
2. Rulează `npm install`
3. Rulează `npx prisma generate`
4. Configurează `DATABASE_URL` către Neon în `.env`
5. Rulează `npx prisma db push`
6. Opțional: `npm run seed`
7. Rulează `npm run dev`

Aplicația seed-uiește automat adminul și evenimentele la primul request server-side dacă baza de date Neon există deja și schema este aplicată.

## Admin implicit

- Email: `admin@garajulcubere.ro`
- Password: `Garaj2026!`

Schimbă valorile prin `ADMIN_EMAIL` și `ADMIN_PASSWORD` în `.env`.
