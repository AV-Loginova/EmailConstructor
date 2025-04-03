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
    HI: 'Log in karo',
    ID: 'Masuk',
  },
  'Hi': {
    EN: 'Hi',
    ES: '¡Hola',
    PT: 'Oi,',
    TR: 'Merhaba',
    HI: 'Namaste',
    ID: 'Hai',
  },
  'All rights reserved': {
    EN: 'All rights reserved',
    ES: 'Todos los derechos reservados',
    PT: 'Todos os direitos reservados',
    TR: 'Tüm hakları saklıdır',
    HI: 'Sarwadhikar surakshit',
    ID: 'Semua hak dilindungi',
  },
  'Book a demo': {
    EN: 'Book a demo',
    ES: 'Reserva una demo',
    PT: 'Agende uma demonstração',
    TR: 'Demo için randevu alın',
    HI: 'Ek demo prapt karen',
    ID: 'Pesan demo',
  },
  // 'Need help?': {
  //   EN: 'Need help?',
  //   ES: '¿Necesitas ayuda?',
  //   PT: 'Precisa de ajuda?',
  //   TR: 'Yardım lazım mı?',
  //   HI: 'क्या मदद चाहिए?',
  //   ID: 'Butuh bantuan?',
  // },
  'Columbus Ave Suite 407, San Francisco': {
    EN: 'Columbus Ave Suite 407, San Francisco',
    ES: 'Columbus Ave Suite 407, San Francisco',
    PT: 'Columbus Ave Suite 407, San Francisco',
    TR: 'Columbus Ave Suite 407, San Francisco',
    HI: 'Columbus Ave Suite 407, San Francisco',
    ID: 'Columbus Ave Suite 407, San Francisco',
  },
  'You received this email because you signed up for a Kommo account': {
    EN: 'You received this email because you signed up for a Kommo account',
    ES: 'Has recibido este correo porque registraste una cuenta en Kommo',
    PT: 'Você recebeu este email porque se inscreveu em uma conta Kommo',
    TR: 'Bir Kommo hesabına kaydolduğunuz için bu mektubu aldınız',
    HI: 'Aapko yah email isliye mila hai kyuki aapne Kommo khate ke liye sign up kiya hai',
    ID: 'Kamu menerima email ini karena kamu mendaftar akun Kommo',
  },
  'Sales manager': {
    EN: 'Sales manager',
    ES: 'Representante de ventas',
    PT: 'Representante de vendas',
    TR: 'Satış temsilcisi',
    HI: 'Bikri karmachari',
    ID: 'Sales Representative',
  },
  'Kommo team': {
    EN: 'Kommo team',
    ES: 'Equipo de Kommo',
    PT: 'Equipe de Kommo',
    TR: 'Kommo ekibi',
    HI: 'Kommo team',
    ID: 'Tim Kommo',
  },
  'https://www.linkedin.com/company/kommo/': {
    EN: 'https://www.linkedin.com/company/kommo/',
    ES: 'https://www.linkedin.com/company/kommo-en-espanol/',
    PT: 'https://www.linkedin.com/company/kommobr/',
    ID: 'https://www.linkedin.com/company/kommo/',
  },
  'https://www.facebook.com/KommoCRM': {
    EN: 'https://www.facebook.com/KommoCRM',
    ES: 'https://www.facebook.com/kommoES',
    PT: 'https://www.facebook.com/KommoBrasil',
    ID: 'https://www.facebook.com/kommoid',
  },
  'https://www.instagram.com/kommocrm/': {
    EN: 'https://www.instagram.com/kommocrm/',
    ES: 'https://www.instagram.com/kommolatam/',
    PT: 'https://www.instagram.com/kommobrasil/',
    ID: 'https://www.instagram.com/kommoindonesia/',
  },
  'https://t.me/kommoglobal': {
    EN: 'https://t.me/kommoglobal',
    ES: 'https://t.me/kommolatam',
    PT: 'https://t.me/kommobrasil',
    ID: 'https://t.me/kommoglobal',
  },
  'https://www.youtube.com/user/amoCRM': {
    EN: 'https://www.youtube.com/user/amoCRM',
    ES: 'https://www.youtube.com/c/amoCRMenEspa%C3%B1ol',
    PT: 'https://www.youtube.com/channel/UCdc-vEO2bODlhdLHcmI3GfQ',
    ID: 'https://www.youtube.com/@kommoidn',
  },
  'https://kommo.com': {
    EN: 'https://www.kommo.com',
    ES: 'https://www.kommo.com/es/',
    PT: 'https://www.kommo.com/br/',
    ID: 'https://www.kommo.com/id/',
  },
  'https://wwww.kommo.com': {
    EN: 'https://www.kommo.com',
    ES: 'https://www.kommo.com/es/',
    PT: 'https://www.kommo.com/br/',
    ID: 'https://www.kommo.com/id/',
  },
};
