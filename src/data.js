export const OFFICIAL_EMAIL = 'platformoyes@gmail.com'

export const CONTACTS = [
  { id: 'saleem', name: 'OYES SALEEM', phone: '+91 96331 11000', wa: '919633111000' },
  { id: 'salih', name: 'SALIH WAYANAD', phone: '+91 99471 98248', wa: '919947198248' },
]

// Shown only inside Folder 2 and its subcategories.
export const CONSTRUCTION_CONTACT = { name: 'Construction', phone: '+91 94472 76504', wa: '919447276504' }

export const FOLDERS = [
  {
    id: 'knowledge', icon: '📚',
    title: { en: 'World of Knowledge', ml: 'അറിവിന്റെ ലോകം' },
    subs: ['Subjects', 'Categories', 'Documents', 'Videos', 'External Links'],
  },
  {
    id: 'construction', icon: '🏗️',
    title: { en: 'Ultimate Construction Solution', ml: 'അൾട്ടിമേറ്റ് കൺസ്ട്രക്ഷൻ സൊല്യൂഷൻ' },
    subs: ['Marble', 'Granite', 'Stone', 'Other Products', 'Designs', 'Completed Projects'],
    contact: CONSTRUCTION_CONTACT,
  },
  {
    id: 'care', icon: '🤝',
    title: { en: 'OYES Public Care', ml: 'ഒയേസ് പബ്ലിക് കെയർ' },
    subs: ['Public Help', 'Service Directory', 'Community Updates'],
  },
  {
    id: 'entertainment', icon: '🎬',
    title: { en: 'OYES Entertainment', ml: 'ഒയേസ് എന്റർടെയ്ൻമെന്റ്' },
    subs: ['OYES INFINITY', 'Cinema', 'Short Films', 'Documentaries', 'Web Series', 'TV Serials', 'Trailers & Teasers'],
  },
  {
    id: 'market', icon: '🛒',
    title: { en: 'OYES Market & Delivery', ml: 'ഒയേസ് മാർക്കറ്റ് & ഡെലിവറി' },
    subs: ['Products', 'Buy / Sell Enquiries', 'Delivery Services'],
  },
  {
    id: 'events', icon: '📣',
    title: { en: 'Events • Advertisements • Jobs', ml: 'ഇവന്റുകൾ • പരസ്യങ്ങൾ • ജോലികൾ' },
    subs: ['Events', 'Advertisements', 'Job Vacancies', 'Urgent Requirements', 'Bulk Hiring'],
  },
]

export const UI = {
  en: { title: 'OYES', brand: 'Salih & Saleem Studio Hub', back: '← Back', settings: 'Settings', share: 'Share', install: 'Install',
        notFound: 'Page not found', home: 'Go home', soon: 'Content for this section is managed by the admin and will appear here once published.',
        login: 'Admin Login', email: 'Email', password: 'Password', signIn: 'Sign in', signOut: 'Sign out', reset: 'Forgot password?',
        notConfigured: 'Online backend is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
        denied: 'Access denied. This account is not an administrator.', resetSent: 'Password reset email sent.', contact: 'Contact', enquiry: 'WhatsApp enquiry' },
  ml: { title: 'ഒയേസ്', brand: 'സാലിഹ് & സലീം സ്റ്റുഡിയോ ഹബ്', back: '← തിരികെ', settings: 'സെറ്റിംഗ്സ്', share: 'ഷെയർ', install: 'ഇൻസ്റ്റാൾ',
        notFound: 'പേജ് കണ്ടെത്തിയില്ല', home: 'ഹോമിലേക്ക്', soon: 'ഈ വിഭാഗത്തിലെ ഉള്ളടക്കം അഡ്മിൻ പ്രസിദ്ധീകരിക്കുമ്പോൾ ഇവിടെ കാണാം.',
        login: 'അഡ്മിൻ ലോഗിൻ', email: 'ഇമെയിൽ', password: 'പാസ്‌വേഡ്', signIn: 'ലോഗിൻ', signOut: 'ലോഗൗട്ട്', reset: 'പാസ്‌വേഡ് മറന്നോ?',
        notConfigured: 'ഓൺലൈൻ ബാക്കെൻഡ് ഇതുവരെ ക്രമീകരിച്ചിട്ടില്ല.',
        denied: 'പ്രവേശനം നിരസിച്ചു. ഈ അക്കൗണ്ട് അഡ്മിൻ അല്ല.', resetSent: 'പാസ്‌വേഡ് റീസെറ്റ് ഇമെയിൽ അയച്ചു.', contact: 'ബന്ധപ്പെടുക', enquiry: 'WhatsApp അന്വേഷണം' },
}
