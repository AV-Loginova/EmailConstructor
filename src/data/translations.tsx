interface Translation {
  EN?: string;
  ES?: string;
  PT?: string;
  TR?: string;
  HI?: string;
  ID?: string;
}

interface TranslationMap {
  [key: string]: Translation;
}

export const translationsMap: TranslationMap = {
  'Log in': {
    EN: 'Log in',
    ES: 'Iniciar sesión',
    PT: 'Login',
    TR: 'Giriş yap',
    HI: 'लॉग इन करें',
    ID: 'Masuk',
  },
  'Hi': {
    EN: 'Hi',
    ES: 'Hola',
    PT: 'Oi',
    TR: 'Merhaba',
    HI: 'नमस्ते',
    ID: 'Hai',
  },
  'All rights reserved': {
    EN: 'All rights reserved',
    ES: 'Todos los derechos reservados',
    PT: 'Todos os direitos reservados',
    TR: 'Tüm hakları saklıdır',
    HI: 'सर्वाधिकार सुरक्षित।',
    ID: 'Semua hak dilindungi',
  },
  'Book a demo': {
    EN: 'Book a demo',
    ES: 'Reserva una demo',
    PT: 'Agende uma demonstração',
    TR: 'Demo için randevu alın',
    HI: 'डेमो बुक करें',
    ID: 'Pesan demo',
  },
};
