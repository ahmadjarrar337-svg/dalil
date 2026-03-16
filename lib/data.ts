export type Category = {
  id: string; slug: string; icon: string
  en: string; ar: string
  bg: string; text: string; border: string
}

export type Provider = {
  id: string; slug: string
  name: string; nameAr: string
  catId: string; hood: string; hoodAr: string
  phone: string
  desc: string; descAr: string
  hours: string; hoursAr: string
  claimed: boolean; verified: boolean
  rating: number; reviews: number
  exp: number
}

export type Review = {
  id: string; pid: string
  author: string; stars: number
  text: string; date: string
}

export const cats: Category[] = [
  { id:'c1', slug:'plumber',      icon:'🔧', en:'Plumber',       ar:'سباك',         bg:'#eff6ff', text:'#1d4ed8', border:'#bfdbfe' },
  { id:'c2', slug:'electrician',  icon:'⚡', en:'Electrician',   ar:'كهربائي',      bg:'#fefce8', text:'#a16207', border:'#fde68a' },
  { id:'c3', slug:'mechanic',     icon:'🚗', en:'Mechanic',      ar:'ميكانيكي',     bg:'#f8fafc', text:'#334155', border:'#e2e8f0' },
  { id:'c4', slug:'ac-repair',    icon:'❄️', en:'AC Repair',     ar:'تكييف',        bg:'#ecfeff', text:'#0e7490', border:'#a5f3fc' },
  { id:'c5', slug:'phone-repair', icon:'📱', en:'Phone Repair',  ar:'إصلاح هاتف',  bg:'#faf5ff', text:'#6d28d9', border:'#ddd6fe' },
  { id:'c6', slug:'cleaning',     icon:'🧹', en:'Home Cleaning', ar:'تنظيف منازل', bg:'#f0fdf4', text:'#15803d', border:'#bbf7d0' },
]

export const providers: Provider[] = [
  { id:'p01', slug:'ahmad-al-karimi',     name:'Ahmad Al-Karimi',         nameAr:'أحمد الكريمي',         catId:'c1', hood:'Abdali',         hoodAr:'العبدلي',     phone:'+962791234567', desc:'Experienced plumber with 15+ years. Leaks, pipes, water heaters, bathroom fixtures. Emergency 24/7.', descAr:'سباك محترف بخبرة 15+ عاماً. تسربات، أنابيب، سخانات. طوارئ 24/7.', hours:'Sat–Thu 8am–8pm, 24/7 emergency', hoursAr:'السبت–الخميس 8ص–8م، طوارئ 24/7', claimed:true,  verified:true,  rating:4.8, reviews:31, exp:15 },
  { id:'p02', slug:'samer-haddad',        name:'Samer Haddad',            nameAr:'سامر حداد',            catId:'c1', hood:'Sweifieh',       hoodAr:'الصويفية',    phone:'+962792345678', desc:'Residential and commercial plumbing. Fast response, fair pricing, no hidden charges.', descAr:'سباكة سكنية وتجارية. استجابة سريعة وأسعار عادلة بلا رسوم خفية.', hours:'Daily 7am–9pm', hoursAr:'يومياً 7ص–9م', claimed:false, verified:false, rating:4.5, reviews:12, exp:8 },
  { id:'p03', slug:'hassan-sabawi',       name:'Hassan Sabawi',           nameAr:'حسن صباوي',            catId:'c1', hood:'Jabal Amman',    hoodAr:'جبل عمّان',   phone:'+962793456789', desc:'Specialist in old building plumbing. Expert at diagnosing complex pipe issues.', descAr:'متخصص في سباكة المباني القديمة وتشخيص مشاكل الأنابيب.', hours:'Sun–Thu 9am–6pm', hoursAr:'الأحد–الخميس 9ص–6م', claimed:true,  verified:true,  rating:4.3, reviews:8,  exp:20 },
  { id:'p04', slug:'omar-nabulsi',        name:'Omar Nabulsi',            nameAr:'عمر النابلسي',         catId:'c2', hood:'Khalda',         hoodAr:'خلدا',        phone:'+962794567890', desc:'Licensed electrician for homes and offices. Solar panels, wiring, breaker panels, inspections.', descAr:'كهربائي مرخص. طاقة شمسية، تمديدات، لوحات كهربائية.', hours:'Sat–Fri 8am–7pm', hoursAr:'السبت–الجمعة 8ص–7م', claimed:true,  verified:true,  rating:4.9, reviews:47, exp:12 },
  { id:'p05', slug:'karim-electric',      name:'Karim Electrical',        nameAr:'كريم الكهربائي',       catId:'c2', hood:'Shmeisani',      hoodAr:'الشميساني',   phone:'+962795678901', desc:'Full electrical services including smart home installations. Fast and certified.', descAr:'خدمات كهربائية كاملة تشمل المنازل الذكية. سريع ومعتمد.', hours:'Daily 8am–8pm', hoursAr:'يومياً 8ص–8م', claimed:false, verified:false, rating:4.6, reviews:19, exp:9 },
  { id:'p06', slug:'tariq-al-masri',      name:'Tariq Al-Masri',          nameAr:'طارق المصري',          catId:'c2', hood:'Gardens',        hoodAr:'الحدائق',     phone:'+962796789012', desc:'Residential wiring and maintenance. Affordable rates, same-day service available.', descAr:'تمديدات وصيانة كهربائية سكنية. أسعار معقولة، خدمة بنفس اليوم.', hours:'Sat–Thu 9am–5pm', hoursAr:'السبت–الخميس 9ص–5م', claimed:false, verified:false, rating:4.2, reviews:6,  exp:5 },
  { id:'p07', slug:'abu-ali-garage',      name:'Abu Ali Auto Garage',     nameAr:'كراج أبو علي',         catId:'c3', hood:'Wadi Saqra',     hoodAr:'وادي السقرة', phone:'+962797890123', desc:'Full-service auto repair for all makes. Engine, brakes, AC, oil, diagnostics. 25+ years.', descAr:'إصلاح شامل لجميع الماركات. محرك، فرامل، تكييف، تشخيص. 25+ عام.', hours:'Sat–Thu 8am–6pm', hoursAr:'السبت–الخميس 8ص–6م', claimed:true,  verified:true,  rating:4.7, reviews:62, exp:25 },
  { id:'p08', slug:'modern-auto',         name:'Modern Auto Services',    nameAr:'خدمات السيارات الحديثة',catId:'c3', hood:'Marka',          hoodAr:'ماركا',       phone:'+962798901234', desc:'Computerized diagnostics. Specializes in European and Japanese cars.', descAr:'تشخيص محوسب. متخصص في السيارات الأوروبية واليابانية.', hours:'Sat–Fri 9am–7pm', hoursAr:'السبت–الجمعة 9ص–7م', claimed:false, verified:false, rating:4.4, reviews:23, exp:11 },
  { id:'p09', slug:'cool-air-amman',      name:'Cool Air Services',       nameAr:'خدمات الهواء البارد',  catId:'c4', hood:'Jubeiha',        hoodAr:'الجبيهة',     phone:'+962799012345', desc:'AC installation, repair and maintenance for all brands. Gas refill, deep cleaning, annual contracts.', descAr:'تركيب وإصلاح وصيانة مكيفات جميع الماركات. شحن غاز، تنظيف عميق.', hours:'Daily 7am–10pm', hoursAr:'يومياً 7ص–10م', claimed:true,  verified:true,  rating:4.8, reviews:38, exp:14 },
  { id:'p10', slug:'freeze-tech',         name:'Freeze Tech HVAC',        nameAr:'فريز تك للتبريد',      catId:'c4', hood:"Tla'a Al-Ali",   hoodAr:'تلاع العلي',  phone:'+962790123456', desc:'HVAC specialist for homes and businesses. Emergency repairs and preventive maintenance.', descAr:'متخصص تدفئة وتبريد. إصلاحات طارئة وصيانة وقائية.', hours:'Sat–Thu 8am–8pm', hoursAr:'السبت–الخميس 8ص–8م', claimed:false, verified:false, rating:4.5, reviews:14, exp:7 },
  { id:'p11', slug:'arctic-cooling',      name:'Arctic Cooling',          nameAr:'آركتيك للتبريد',       catId:'c4', hood:'Rabieh',         hoodAr:'الرابية',     phone:'+962791122334', desc:'Fast AC repairs. All brands: Samsung, LG, Carrier, Gree. Free diagnosis.', descAr:'إصلاح سريع. جميع الماركات سامسونج، LG، كارير. تشخيص مجاني.', hours:'Daily 8am–9pm', hoursAr:'يومياً 8ص–9م', claimed:false, verified:false, rating:4.1, reviews:9,  exp:6 },
  { id:'p12', slug:'fix-it-phones',       name:'Fix It Phone Repair',     nameAr:'فيكس إت للهواتف',      catId:'c5', hood:'Downtown',       hoodAr:'وسط البلد',   phone:'+962792233445', desc:'Screen replacements, batteries, water damage, software. All iPhone & Android. 1-hour service.', descAr:'شاشات، بطاريات، أضرار الماء، برامج. جميع iPhone وAndroid. خدمة بساعة.', hours:'Sat–Thu 10am–9pm', hoursAr:'السبت–الخميس 10ص–9م', claimed:true,  verified:true,  rating:4.9, reviews:84, exp:8 },
  { id:'p13', slug:'mobile-clinic',       name:'Mobile Clinic Amman',     nameAr:'كلينيك الجوال',        catId:'c5', hood:'Sweifieh',       hoodAr:'الصويفية',    phone:'+962793344556', desc:'Professional phone and tablet repair. Genuine parts, 30-day warranty.', descAr:'إصلاح احترافي للهواتف والأجهزة اللوحية. قطع أصلية، ضمان 30 يوماً.', hours:'Daily 10am–8pm', hoursAr:'يومياً 10ص–8م', claimed:false, verified:false, rating:4.6, reviews:41, exp:6 },
  { id:'p14', slug:'techno-fix',          name:'TechnoFix Jordan',        nameAr:'تيكنوفيكس',            catId:'c5', hood:'Bayader',        hoodAr:'بيادر',       phone:'+962794455667', desc:'iPhone specialist. Fast screen repair, battery replacement, unlocking.', descAr:'متخصص iPhone. إصلاح شاشات سريع، بطاريات، فتح شبكات.', hours:'Sat–Thu 11am–8pm', hoursAr:'السبت–الخميس 11ص–8م', claimed:false, verified:false, rating:4.3, reviews:17, exp:4 },
  { id:'p15', slug:'sparkle-clean',       name:'Sparkle Clean Services',  nameAr:'سباركل للتنظيف',       catId:'c6', hood:'Khalda',         hoodAr:'خلدا',        phone:'+962795566778', desc:'Professional home and office cleaning. Deep cleaning, move-in/out, sofa and carpet cleaning.', descAr:'تنظيف احترافي. تنظيف عميق، عند الانتقال، كنبات وسجاد.', hours:'Sat–Thu 8am–6pm', hoursAr:'السبت–الخميس 8ص–6م', claimed:true,  verified:true,  rating:4.8, reviews:53, exp:5 },
  { id:'p16', slug:'nour-cleaning',       name:'Nour Cleaning Co.',       nameAr:'شركة نور للتنظيف',     catId:'c6', hood:'Shmeisani',      hoodAr:'الشميساني',   phone:'+962796677889', desc:'Eco-friendly cleaning. Residential and commercial. Weekly and monthly contracts.', descAr:'تنظيف صديق للبيئة. عقود أسبوعية وشهرية.', hours:'Sat–Fri 8am–5pm', hoursAr:'السبت–الجمعة 8ص–5م', claimed:false, verified:false, rating:4.5, reviews:28, exp:7 },
  { id:'p17', slug:'clean-amman',         name:'Clean Amman',             nameAr:'كلين عمّان',           catId:'c6', hood:'Abdoun',         hoodAr:'عبدون',       phone:'+962797788990', desc:'Premium cleaning for villas. Post-construction cleaning and marble polishing.', descAr:'تنظيف فاخر للفيلات. تنظيف ما بعد البناء وتلميع رخام.', hours:'Sat–Thu 9am–5pm', hoursAr:'السبت–الخميس 9ص–5م', claimed:true,  verified:true,  rating:4.7, reviews:22, exp:10 },
  { id:'p18', slug:'express-clean',       name:'Express Home Cleaning',   nameAr:'تنظيف المنازل السريع', catId:'c6', hood:'Marj Al-Hamam',  hoodAr:'مرج الحمام',  phone:'+962798899001', desc:'Same-day booking. Affordable rates from 25 JD. All supplies provided.', descAr:'حجز بنفس اليوم. أسعار من 25 دينار. جميع المستلزمات متوفرة.', hours:'Daily 7am–8pm', hoursAr:'يومياً 7ص–8م', claimed:false, verified:false, rating:4.2, reviews:15, exp:3 },
]

export const reviews: Review[] = [
  { id:'r01', pid:'p01', author:'Khaled M.',   stars:5, text:'Fixed our main leak in under 30 minutes. Very professional, clean work, fair price.',       date:'2024-11-15' },
  { id:'r02', pid:'p01', author:'Laila S.',    stars:5, text:'Came on a Friday evening on short notice. Saved us from flooding the apartment below.',    date:'2024-10-22' },
  { id:'r03', pid:'p01', author:'Tariq N.',    stars:5, text:'Replaced all bathroom fixtures. Neat, fast and honest about pricing before starting.',     date:'2024-09-10' },
  { id:'r04', pid:'p01', author:'Rania H.',    stars:4, text:'Good work overall. Took a bit longer than expected but quality was excellent.',             date:'2024-08-30' },
  { id:'r05', pid:'p04', author:'Faris A.',    stars:5, text:'Best electrician I have ever worked with. Installed solar panels perfectly.',               date:'2024-12-01' },
  { id:'r06', pid:'p04', author:'Nadia K.',    stars:5, text:'Fixed a dangerous wiring issue in our kitchen quickly. Very knowledgeable.',               date:'2024-11-18' },
  { id:'r07', pid:'p04', author:'Bilal R.',    stars:5, text:'Upgraded our whole electrical panel. Clean work, no mess left behind.',                    date:'2024-10-05' },
  { id:'r08', pid:'p07', author:'Samir T.',    stars:5, text:'Abu Ali has been fixing my cars for 10 years. Honest pricing every time.',                 date:'2024-11-28' },
  { id:'r09', pid:'p07', author:'Hana O.',     stars:5, text:'Diagnosed and fixed a mystery engine noise same day. Amazing service.',                    date:'2024-10-14' },
  { id:'r10', pid:'p07', author:'Ahmad B.',    stars:4, text:'Great work on my brakes. A bit busy so had to wait, but worth the quality.',               date:'2024-09-20' },
  { id:'r11', pid:'p09', author:'Lina F.',     stars:5, text:'Called at 8pm in July when our AC died. They came within the hour. Life savers!',          date:'2024-07-22' },
  { id:'r12', pid:'p09', author:'Walid M.',    stars:5, text:'Annual maintenance done professionally. AC works better than when it was new.',            date:'2024-06-10' },
  { id:'r13', pid:'p12', author:'Sara J.',     stars:5, text:'Dropped my iPhone with a shattered screen. Fixed in 45 minutes for a fair price!',        date:'2024-12-03' },
  { id:'r14', pid:'p12', author:'Hassan L.',   stars:5, text:'Recovered all my data from a water-damaged phone. Incredible work.',                       date:'2024-11-09' },
  { id:'r15', pid:'p12', author:'Mona A.',     stars:5, text:'Battery replacement done while I waited. Fast and affordable.',                            date:'2024-10-28' },
  { id:'r16', pid:'p15', author:'Dalia N.',    stars:5, text:'Deep cleaned our villa before moving in. Absolutely spotless. Highly recommend.',          date:'2024-11-30' },
  { id:'r17', pid:'p15', author:'Kareem S.',   stars:5, text:'Use them monthly. Consistent quality every time. Very reliable team.',                     date:'2024-10-15' },
  { id:'r18', pid:'p15', author:'Rana T.',     stars:4, text:'Great cleaning, had to reschedule once but the work itself is excellent.',                 date:'2024-09-08' },
]

export const getCat  = (id: string) => cats.find(c => c.id === id)!
export const getCatBySlug = (slug: string) => cats.find(c => c.slug === slug)
export const getProvider  = (slug: string) => providers.find(p => p.slug === slug)
export const getReviews   = (pid: string)  => reviews.filter(r => r.pid === pid).sort((a,b) => b.date.localeCompare(a.date))
export const byCategory   = (catId: string) => providers.filter(p => p.catId === catId).sort((a,b) => b.rating - a.rating)
export const topRated     = () => providers.filter(p => p.verified).sort((a,b) => b.rating - a.rating).slice(0,4)
