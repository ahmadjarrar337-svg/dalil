'use client'
import { useState, useEffect } from 'react'

export type L = 'en' | 'ar'
const KEY = 'dl'

export function useLang(): [L, (l: L) => void] {
  const [l, set] = useState<L>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY) as L | null
      if (stored === 'ar') set('ar')
    } catch {}
    const handler = () => {
      try { set((localStorage.getItem(KEY) as L) || 'en') } catch {}
    }
    window.addEventListener(KEY, handler)
    return () => window.removeEventListener(KEY, handler)
  }, [])

  const setLang = (next: L) => {
    try { localStorage.setItem(KEY, next) } catch {}
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
    window.dispatchEvent(new Event(KEY))
    set(next)
  }

  return [l, setLang]
}

type D = Record<string, string>
const en: D = {
  verified:'Verified', unclaimed:'Unclaimed', reviews:'reviews', review:'review',
  call:'Call Now', wa:'WhatsApp', share:'Share', write_review:'Write a Review',
  claim:'Claim This Listing', hours:'Working Hours', hood:'Neighborhood',
  about:'About', no_reviews:'No reviews yet', be_first:'Be the first to review',
  exp:'yrs experience', all:'All Categories', sorted:'Sorted by rating',
  found:'providers found', claim_title:"Is this your business?",
  claim_sub:'Verify your phone number to manage this listing and get a Verified badge.',
  your_phone:'Your phone number', send_code:'Send Verification Code',
  enter_code:'Enter 6-digit code', confirm:'Confirm & Claim',
  claimed_ok:'Listing claimed! You can now manage your profile.',
  manage:'Manage Your Listing', edit_desc:'Edit Description',
  edit_hours:'Set Working Hours', upload:'Upload Photo', view_public:'View Public Profile',
  save:'Save', cancel:'Cancel', saved:'Saved!', search:'Search providers…',
  no_results:'No providers found', back:'Back', rate:'Rate this provider',
  name_ph:'Your name', review_ph:'Share your experience (optional)…',
  submit:'Submit Review', thanks:'Thank you for your review!',
  report:'Report listing', copy:'Copy link', copied:'Copied!',
  provider_cta:'Are you a service provider?',
  provider_sub:'Claim your listing and start receiving customers.',
  find_listing:'Find your listing →', top_rated:'Top Rated', view_all:'View all',
}
const ar: D = {
  verified:'موثّق', unclaimed:'غير مطالب به', reviews:'تقييمات', review:'تقييم',
  call:'اتصل الآن', wa:'واتساب', share:'مشاركة', write_review:'اكتب تقييماً',
  claim:'طالب بهذا الإدراج', hours:'ساعات العمل', hood:'الحي',
  about:'نبذة', no_reviews:'لا توجد تقييمات بعد', be_first:'كن أول من يكتب تقييماً',
  exp:'سنوات خبرة', all:'جميع الفئات', sorted:'مرتبة حسب التقييم',
  found:'مزود خدمة موجود', claim_title:'هل هذا نشاطك التجاري؟',
  claim_sub:'تحقق من رقم هاتفك لإدارة هذا الإدراج والحصول على شارة الموثّق.',
  your_phone:'رقم هاتفك', send_code:'إرسال رمز التحقق',
  enter_code:'أدخل الرمز المكون من 6 أرقام', confirm:'تأكيد والمطالبة',
  claimed_ok:'تمت المطالبة! يمكنك الآن إدارة ملفك الشخصي.',
  manage:'إدارة إدراجك', edit_desc:'تعديل الوصف',
  edit_hours:'تحديد ساعات العمل', upload:'رفع صورة', view_public:'عرض الملف العام',
  save:'حفظ', cancel:'إلغاء', saved:'تم الحفظ!', search:'ابحث عن مزودي خدمة…',
  no_results:'لم يتم العثور على مزودي خدمة', back:'رجوع', rate:'قيّم هذا المزود',
  name_ph:'اسمك', review_ph:'شارك تجربتك (اختياري)…',
  submit:'إرسال التقييم', thanks:'شكراً على تقييمك!',
  report:'إبلاغ عن الإدراج', copy:'نسخ الرابط', copied:'تم النسخ!',
  provider_cta:'هل أنت مزود خدمة؟',
  provider_sub:'طالب بإدراجك وابدأ في استقبال العملاء.',
  find_listing:'ابحث عن إدراجك ←', top_rated:'الأعلى تقييماً', view_all:'عرض الكل',
}
export const tx = (l: L, k: string): string => (l === 'ar' ? ar : en)[k] ?? k
