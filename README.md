# B-18 Sai Dham Society - Invoice Generator

A professional React Native (Expo) application for generating and sharing maintenance invoices for B-18 Sai Dham Society.

## Features

- ✨ Clean and modern UI
- 📝 Easy input form for resident details
- 💰 Automatic calculation of total payable amount
- 📄 Professional PDF invoice generation
- 📱 Direct sharing via WhatsApp or other apps
- 🎨 Beautiful invoice design with society branding

## Tech Stack

- React Native 0.76.5 with Expo SDK 54
- expo-print (for PDF generation)
- expo-sharing (for file sharing)
- JavaScript

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on your device:
   - Download the "Expo Go" app on your Android/iOS device
   - Scan the QR code shown in the terminal
   - Or press 'a' for Android emulator, 'i' for iOS simulator

## Usage

1. **Enter Details**: Fill in the form with:
   - Flat Number (e.g., "101")
   - Resident Name (e.g., "Mr. Sharma")
   - Billing Month (e.g., "November 2023")
   - Current Amount
   - Outstanding Amount (optional, defaults to 0)

2. **Generate Bill**: Click the "Generate Bill" button to:
   - Create a professional PDF invoice
   - Open share dialog to send via WhatsApp, Email, etc.

3. **Clear Form**: Use the "Clear Form" button to reset all fields

## Invoice Features

The generated PDF invoice includes:
- Society name prominently displayed
- Invoice date
- Resident details
- Itemized charges breakdown
- Highlighted total payable amount
- Professional footer with thank you message

## Building for Production

### Android APK:
```bash
eas build --platform android --profile preview
```

### iOS:
```bash
eas build --platform ios --profile preview
```

## Requirements

- Node.js 14 or higher
- npm or yarn
- Expo CLI
- For iOS: macOS with Xcode
- For Android: Android Studio (optional)

## License

Private - B-18 Sai Dham Society

## Support

For any issues or questions, contact the society committee.

