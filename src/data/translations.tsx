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
  'Need help?': {
    EN: 'Need help?',
    ES: '¿Necesitas ayuda?',
    PT: 'Precisa de ajuda?',
    TR: 'Yardım lazım mı?',
    HI: 'क्या मदद चाहिए?',
    ID: 'Butuh bantuan?',
  },
  'Columbus Ave Suite 407, San Francisco': {
    EN: 'Columbus Ave Suite 407, San Francisco',
    ES: 'Columbus Ave Suite 407, San Francisco',
    PT: 'Columbus Ave Suite 407, San Francisco',
    TR: 'Columbus Ave Suite 407, San Francisco',
    HI: 'कोलंबस एवेन्यू, सुइट 407, सैन फ्रांसिस्को',
    ID: 'Columbus Ave Suite 407, San Francisco',
  },
};
