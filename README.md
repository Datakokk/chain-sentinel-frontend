# ChainSentinel Frontend

**ChainSentinel** is a mobile application built with [Expo](https://expo.dev) and React Native. It offers intelligent monitoring and detection of fraudulent activity in blockchain transactions.

This project is part of a complete system including a FastAPI backend and Firebase authentication.

---

## 🚀 Features

- 🔒 User authentication via Firebase (register, login, logout)
- 📊 Real-time transaction risk analysis
- 🧠 Integration with machine learning API for fraud detection
- ⚠️ Security alerts for suspicious addresses
- 📱 Clean and intuitive UI with bottom navigation
- 📝 Settings screen with:
  - Name, email, and password update
  - Firebase Auth + Firestore sync
- 🧪 File-based routing using `expo-router`

---

## 📁 Project Structure

```
app/
├── _layout.tsx
├── (chain-sentinel-app)/
│   ├── _layout.tsx
│   └── (home)/
│       ├── index.tsx            # Home: recent activity + transactions
│       ├── consulta.tsx         # Query screen for transaction/address
│       ├── alertas.tsx          # Alerts for suspicious addresses
│       ├── configuracion.tsx    # User settings and logout
│       ├── pagina3.tsx          # Placeholder screen
│       └── components/
│           └── BottomNavBar.tsx
├── auth/
│   ├── login/
│   │   └── index.tsx
│   └── register/
│       └── index.tsx
assets/
├── fonts/                       # Custom fonts (Kanit, SpaceMono)
├── images/                      # App icons and logo
core/
└── auth/
    └── firebaseConfig.ts        # Firebase app + auth + Firestore
```

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Clone `.env.template` and rename it to `.env`, then set your Firebase keys and backend IP:

```bash
cp .env.template .env
```

Update `EXPO_PUBLIC_API_BASE_URL` with your local or production IP address.

### 3. Start the development server

```bash
npx expo start
```

Then choose one of the following:

- Open in a **Development Build**
- Use **Expo Go** on your phone
- Launch an **Android Emulator** or **iOS Simulator**

---

## 🧪 Available Scripts

| Command                 | Description             |
| ----------------------- | ----------------------- |
| `npx expo start`        | Start Metro bundler     |
| `npm run reset-project` | Reset to blank template |

---

## 📷 Assets & Design

- App logo: `assets/images/TecnologicoFuturista.png`
- UI design: Inspired by futuristic blockchain themes
- Navigation: Tab-based with consistent styling

---

## 🔐 Authentication

This project uses **Firebase Authentication**:

- Email/password login
- Update email and password from settings screen
- User profile name stored in **Firestore**

---

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Firebase for Web (v9)](https://firebase.google.com/docs/web/setup)
- [Expo Router](https://expo.github.io/router/docs)

---

## 🧠 Credits

This app is part of the **ChainSentinel** project: a secure and intelligent blockchain fraud detection system with backend API, ML microservice, and mobile frontend.
