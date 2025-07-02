interface Translation {
  EN?: string;
  ES?: string;
  PT?: string;
  TR?: string;
  HI?: string;
  ID?: string;
  RU?: string;
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
    RU: 'Войти',
  },
  'Hi': {
    EN: 'Hi',
    ES: '¡Hola',
    PT: 'Oi,',
    TR: 'Merhaba',
    HI: 'Namaste',
    ID: 'Hai',
    RU: 'Привет,',
  },
  'All rights reserved': {
    EN: 'All rights reserved',
    ES: 'Todos los derechos reservados',
    PT: 'Todos os direitos reservados',
    TR: 'Tüm hakları saklıdır',
    HI: 'Sarwadhikar surakshit',
    ID: 'Semua hak dilindungi',
    RU: 'Все права защищены',
  },
  'Book a demo': {
    EN: 'Book a demo',
    ES: 'Reserva una demo',
    PT: 'Agende uma demonstração',
    TR: 'Demo için randevu alın',
    HI: 'Ek demo prapt karen',
    ID: 'Pesan demo',
    RU: '',
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
    RU: 'Columbus Ave Suite 407, Сан-Франциско, Калифорния 94133-4589',
  },
  'You received this email because you signed up for a Kommo account': {
    EN: 'You received this email because you signed up for a Kommo account',
    ES: 'Has recibido este correo porque registraste una cuenta en Kommo',
    PT: 'Você recebeu este email porque se inscreveu em uma conta Kommo',
    TR: 'Bir Kommo hesabına kaydolduğunuz için bu mektubu aldınız',
    HI: 'Aapko yah email isliye mila hai kyuki aapne Kommo khate ke liye sign up kiya hai',
    ID: 'Kamu menerima email ini karena kamu mendaftar akun Kommo',
    RU: 'Вы получили это письмо, потому что зарегистрированы в Kommo',
  },
  'Sales manager': {
    EN: 'Sales manager',
    ES: 'Representante de ventas',
    PT: 'Representante de vendas',
    TR: 'Satış temsilcisi',
    HI: 'Bikri karmachari',
    ID: 'Sales Representative',
    RU: '',
  },
  'Kommo team': {
    EN: 'Kommo team',
    ES: 'Equipo de Kommo',
    PT: 'Equipe de Kommo',
    TR: 'Kommo ekibi',
    HI: 'Kommo team',
    ID: 'Tim Kommo',
    RU: '',
  },
  'https://www.linkedin.com/company/kommo/': {
    EN: 'https://www.linkedin.com/company/kommo/',
    ES: 'https://www.linkedin.com/company/kommo-en-espanol/',
    PT: 'https://www.linkedin.com/company/kommobr/',
    ID: 'https://www.linkedin.com/company/kommo/',
    TR: 'https://www.linkedin.com/company/kommo/',
    HI: 'https://www.linkedin.com/company/kommo/',
    RU: '',
  },
  'https://www.facebook.com/KommoCRM': {
    EN: 'https://www.facebook.com/KommoCRM',
    ES: 'https://www.facebook.com/kommoES',
    PT: 'https://www.facebook.com/KommoBrasil',
    ID: 'https://www.facebook.com/kommoid',
    TR: 'https://www.facebook.com/KommoTurkiye/',
    HI: 'https://www.facebook.com/KommoCRM',
    RU: '',
  },
  'https://www.instagram.com/kommocrm/': {
    EN: 'https://www.instagram.com/kommocrm/',
    ES: 'https://www.instagram.com/kommolatam/',
    PT: 'https://www.instagram.com/kommobrasil/',
    ID: 'https://www.instagram.com/kommoindonesia/',
    TR: 'https://www.instagram.com/kommotr/',
    HI: 'https://www.instagram.com/kommocrm/',
    RU: '',
  },
  'https://t.me/kommoglobal': {
    EN: 'https://t.me/kommoglobal',
    ES: 'https://t.me/kommolatam',
    PT: 'https://t.me/kommobrasil',
    ID: 'https://t.me/kommoglobal',
    TR: 'https://t.me/kommoglobal',
    HI: 'https://t.me/kommoglobal',
    RU: '',
  },
  'https://www.youtube.com/user/amoCRM': {
    EN: 'https://www.youtube.com/user/amoCRM',
    ES: 'https://www.youtube.com/c/amoCRMenEspa%C3%B1ol',
    PT: 'https://www.youtube.com/channel/UCdc-vEO2bODlhdLHcmI3GfQ',
    ID: 'https://www.youtube.com/@kommoidn',
    TR: 'https://www.youtube.com/@KommoT%C3%BCrkiye',
    HI: 'https://www.youtube.com/user/amoCRM',
    RU: '',
  },
  'https://kommo.com': {
    EN: 'https://www.kommo.com',
    ES: 'https://www.kommo.com/es/',
    PT: 'https://www.kommo.com/br/',
    ID: 'https://www.kommo.com/id/',
    TR: 'https://www.kommo.com',
    HI: 'https://www.kommo.com',
    RU: '',
  },
  'https://wwww.kommo.com': {
    EN: 'https://www.kommo.com',
    ES: 'https://www.kommo.com/es/',
    PT: 'https://www.kommo.com/br/',
    ID: 'https://www.kommo.com/id/',
    TR: 'https://www.kommo.com',
    HI: 'https://www.kommo.com',
    RU: '',
  },
};
