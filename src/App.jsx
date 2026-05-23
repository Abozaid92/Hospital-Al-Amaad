import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useInView,
} from "framer-motion";
import {
  Heart,
  Stethoscope,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Send,
  X,
  MessageCircle,
  Shield,
  Award,
  Users,
  Star,
  Quote,
  Menu,
  Globe,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  Clock3,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Check,
  User,
  FileText,
  Activity,
  Brain,
  Microscope,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Circle,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/* ═══════════════════════════════════════════════════════════════
   Leaflet Icon Fix
   ═══════════════════════════════════════════════════════════════ */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* ═══════════════════════════════════════════════════════════════
   i18n Configuration
   ═══════════════════════════════════════════════════════════════ */
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: {
          home: "Home",
          specialties: "Specialties",
          doctors: "Doctors",
          about: "About",
          contact: "Contact",
          book: "Book Appointment",
        },
        hero: {
          tagline: "Where Healing Meets Innovation",
          title: "Your Health, Our",
          titleHighlight: "Sacred Mission",
          subtitle:
            "Experience world-class healthcare with cutting-edge technology and compassionate experts dedicated to your wellbeing.",
          ctaPrimary: "Book Consultation",
          ctaSecondary: "Meet Our Doctors",
          stats: {
            patients: "Happy Patients",
            doctors: "Expert Doctors",
            years: "Years of Trust",
            awards: "Awards Won",
          },
        },
        specialties: {
          tagline: "Centers of Excellence",
          title: "World-Class",
          titleHighlight: "Specialties",
          subtitle:
            "Comprehensive medical departments equipped with the latest technology and led by renowned specialists.",
          items: [
            {
              name: "Cardiology",
              desc: "Advanced heart care with state-of-the-art diagnostics and interventional procedures.",
            },
            {
              name: "Neurology",
              desc: "Expert care for brain, spine, and nervous system conditions using cutting-edge technology.",
            },
            {
              name: "Orthopedics",
              desc: "Comprehensive bone, joint, and muscle care from sports injuries to joint replacement.",
            },
            {
              name: "Pediatrics",
              desc: "Gentle, specialized healthcare for infants, children, and adolescents.",
            },
            {
              name: "Ophthalmology",
              desc: "Advanced eye care including LASIK, cataract surgery, and retina treatment.",
            },
            {
              name: "Dermatology",
              desc: "Medical and cosmetic skin care using the latest laser and aesthetic technologies.",
            },
          ],
        },
        whyUs: {
          tagline: "Why Al-Amed",
          title: "The Difference Is in",
          titleHighlight: "The Details",
          subtitle:
            "We combine medical excellence with human compassion to deliver an unparalleled healthcare experience.",
          features: [
            {
              title: "24/7 Emergency Care",
              desc: "Round-the-clock emergency department with rapid response teams and advanced life support systems.",
            },
            {
              title: "AI-Powered Diagnostics",
              desc: "Cutting-edge artificial intelligence assisting our physicians for faster, more accurate diagnoses.",
            },
            {
              title: "Patient-Centered Approach",
              desc: "Every treatment plan is tailored to your unique needs, preferences, and medical history.",
            },
            {
              title: "Globally Accredited",
              desc: "JCI accredited facility meeting the highest international standards for healthcare quality and safety.",
            },
          ],
        },
        doctors: {
          tagline: "Meet Our Experts",
          title: "Leading",
          titleHighlight: "Specialists",
          subtitle:
            "Our team of board-certified physicians brings decades of experience and a passion for healing.",
          items: [
            {
              name: "Dr. Karim El-Masry",
              role: "Chief of Cardiology",
              bio: "20+ years experience. Harvard-trained interventional cardiologist specializing in complex coronary procedures.",
            },
            {
              name: "Dr. Layla Hassan",
              role: "Head of Neurology",
              bio: "Pioneer in neuroimaging. Led groundbreaking research in stroke treatment and brain mapping techniques.",
            },
            {
              name: "Dr. Samir Fouda",
              role: "Senior Orthopedic Surgeon",
              bio: "Renowned joint replacement specialist. Performed 5,000+ successful surgeries with minimally invasive techniques.",
            },
            {
              name: "Dr. Nour Ibrahim",
              role: "Lead Pediatrician",
              bio: "Beloved by families. Specializes in pediatric oncology and developmental medicine with gentle, holistic care.",
            },
          ],
        },
        testimonials: {
          tagline: "Patient Stories",
          title: "Voices of",
          titleHighlight: "Trust",
          subtitle:
            "Real stories from real patients whose lives we have had the privilege to touch.",
          items: [
            {
              name: "Amira Khalil",
              text: "After my heart surgery, the care I received was beyond anything I imagined. Dr. El-Masry saved my life, and the nursing staff treated me like family. I am forever grateful.",
            },
            {
              name: "Omar Hossam",
              text: "My daughter was diagnosed with a rare condition. The pediatric team at Al-Amed went above and beyond, coordinating with specialists worldwide. Today, she is thriving. Thank you, Dr. Nour.",
            },
            {
              name: "Fatima Al-Rashid",
              text: "The neurology department diagnosed my condition when three other hospitals could not. Their persistence and cutting-edge technology gave me answers and a treatment plan that changed my life.",
            },
            {
              name: "Youssef Mahmoud",
              text: "I came in for a knee replacement terrified. The orthopedic team made me feel confident and cared for. Six months later, I am hiking again. Truly miraculous care.",
            },
          ],
        },
        faq: {
          tagline: "Common Questions",
          title: "Frequently",
          titleHighlight: "Asked",
          subtitle:
            "Find answers to the most common questions about our services and facilities.",
          items: [
            {
              q: "How do I book an appointment?",
              a: "You can book online through our website, call our 24/7 hotline, or use our WhatsApp service. Same-day appointments are often available for urgent cases.",
            },
            {
              q: "Do you accept international insurance?",
              a: "Yes, we work with all major international insurance providers. Our dedicated insurance team handles all paperwork and pre-authorizations on your behalf.",
            },
            {
              q: "What are your visiting hours?",
              a: "General visiting hours are from 10:00 AM to 8:00 PM daily. Intensive care units have designated visiting times. Special arrangements can be made upon request.",
            },
            {
              q: "Is emergency care available 24/7?",
              a: "Absolutely. Our emergency department operates round-the-clock with specialized trauma teams, advanced life support, and direct access to all specialty departments.",
            },
            {
              q: "Do you offer telemedicine consultations?",
              a: "Yes, we offer secure video consultations with most of our specialists. Telemedicine appointments can be booked through the same channels as in-person visits.",
            },
          ],
        },
        contact: {
          tagline: "Reach Out",
          title: "We Are Here",
          titleHighlight: "For You",
          subtitle:
            "Whether it is an emergency or a routine inquiry, our team is ready to assist you 24 hours a day.",
          form: {
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            message: "How can we help?",
            submit: "Send Message",
            success: "Message sent successfully!",
          },
          info: {
            address: "126 Nile Corniche, Cairo, Egypt",
            phone: "+20 108 076 1700",
            email: "care@alamed-hospital.com",
            hours: "Open 24 / 7",
          },
        },
        chatbot: {
          title: "Al-Amed AI Assistant",
          subtitle: "Powered by Medical Intelligence",
          placeholder: "Ask about our services, doctors, or booking...",
          greeting:
            "Hello! I am your Al-Amed AI assistant. How can I help you today? You can ask about our specialties, doctors, or book an appointment.",
          quickQuestions: [
            "Book an appointment",
            "Our doctors",
            "Working hours",
            "Emergency care",
          ],
        },
        footer: {
          rights: "All rights reserved.",
          tagline: "Healing with compassion, innovation, and excellence.",
        },
      },
    },
    ar: {
      translation: {
        nav: {
          home: "الرئيسية",
          specialties: "التخصصات",
          doctors: "الأطباء",
          about: "عنّا",
          contact: "تواصل",
          book: "احجز موعد",
        },
        hero: {
          tagline: "حيث يلتقي الشفاء بالابتكار",
          title: "صحتك،",
          titleHighlight: "رسالتنا المقدسة",
          subtitle:
            "اختبر رعاية صحية عالمية المستوى مع تقنية متطورة وخبراء متعاطفون مكرسون لصحتك ورفاهيتك.",
          ctaPrimary: "احجز استشارة",
          ctaSecondary: "تعرّف على أطبائنا",
          stats: {
            patients: "مريض سعيد",
            doctors: "طبيب خبير",
            years: "سنة من الثقة",
            awards: "جائزة عالمية",
          },
        },
        specialties: {
          tagline: "مراكز التميز",
          title: "تخصصات",
          titleHighlight: "عالمية المستوى",
          subtitle:
            "أقسام طبية شاملة مجهزة بأحدث التقنيات ويقودها أخصائيون مشهورون.",
          items: [
            {
              name: "أمراض القلب",
              desc: "رعاية قلبية متقدمة مع تشخيصات حديثة وإجراءات تداخلية متطورة.",
            },
            {
              name: "الأعصاب",
              desc: "رعاية متخصصة لحالات الدماغ والعمود الفقري والجهاز العصبي باستخدام تقنيات متطورة.",
            },
            {
              name: "العظام",
              desc: "رعاية شاملة للعظام والمفاصل والعضلات من إصابات رياضية إلى استبدال المفاصل.",
            },
            {
              name: "طب الأطفال",
              desc: "رعاية صحية متخصصة وحميمة للرضع والأطفال والمراهقين.",
            },
            {
              name: "طب العيون",
              desc: "رعاية متقدمة للعيون تشمل الليزك وجراحة المياه البيضاء وعلاج الشبكية.",
            },
            {
              name: "الجلدية",
              desc: "رعاية الجلد الطبية والتجميلية باستخدام أحدث تقنيات الليزر والتجميل.",
            },
          ],
        },
        whyUs: {
          tagline: "لماذا الأعمد",
          title: "الفرق يكمن",
          titleHighlight: "في التفاصيل",
          subtitle:
            "نجمع بين التميز الطبي والتعاطف الإنساني لتقديم تجربة رعاية صحية لا مثيل لها.",
          features: [
            {
              title: "طوارئ 24/7",
              desc: "قسم طوارئ على مدار الساعة مع فرق استجابة سريعة وأنظمة دعم حياة متقدمة.",
            },
            {
              title: "تشخيص بالذكاء الاصطناعي",
              desc: "ذكاء اصطناعي متطور يساعد أطباءنا لتشخيصات أسرع وأكثر دقة.",
            },
            {
              title: "نهج يركز على المريض",
              desc: "كل خطة علاج مُصممة خصيصًا لاحتياجاتك وتفضيلاتك وتاريخك الطبي الفريد.",
            },
            {
              title: "معتمد عالمياً",
              desc: "منشأة معتمدة من اللجنة الدولية تلبي أعلى المعايير العالمية للجودة والسلامة الصحية.",
            },
          ],
        },
        doctors: {
          tagline: "تعرّف على خبرائنا",
          title: "كبار",
          titleHighlight: "الأخصائيين",
          subtitle:
            "فريقنا من الأطباء المعتمدين يجمع عقودًا من الخبرة وشغفًا بالشفاء.",
          items: [
            {
              name: "د. كريم المصري",
              role: "رئيس قسم القلب",
              bio: "خبرة تزيد عن 20 عاماً. أخصائي قلب تداخلي تخرج من هارفارد متخصص في إجراءات الشرايين المعقدة.",
            },
            {
              name: "د. ليلى حسن",
              role: "رئيسة قسم الأعصاب",
              bio: "رائدة في تصوير الأعصاب. قادت أبحاثًا رائدة في علاج السكتة الدماغية وتقنيات رسم الدماغ.",
            },
            {
              name: "د. سمير فودة",
              role: "جرّاح عظام أول",
              bio: "أخصائي مشهور في استبدال المفاصل. أجرى أكثر من 5000 عملية ناجحة بتقنيات الحد الأدنى من التدخل.",
            },
            {
              name: "د. نور إبراهيم",
              role: "رئيسة طب الأطفال",
              bio: "محبوبة من الأسر. متخصصة في أورام الأطفال والطب التنموي برعاية شاملة وحنونة.",
            },
          ],
        },
        testimonials: {
          tagline: "قصص المرضى",
          title: "أصوات",
          titleHighlight: "الثقة",
          subtitle:
            "قصص حقيقية من مرضى حقيقيين whom we had the privilege to touch their lives.",
          items: [
            {
              name: "أميرة خليل",
              text: "بعد جراحة قلبي، كانت الرعاية التي تلقيتها أعلى بكثير مما تخيلت. د. كريم أنقذ حياتي، والممرضات عاملوني مثل العائلة. أنا ممتنة إلى الأبد.",
            },
            {
              name: "عمر حسام",
              text: "تم تشخيص ابنتي بحالة نادرة. فريق طب الأطفال في الأعمد تجاوز كل التوقعات، منسقين مع أخصائيين حول العالم. اليوم، هي تزدهر. شكراً، د. نور.",
            },
            {
              name: "فاطمة الرشيد",
              text: "قسم الأعصاب في الأعمد شخص حالتي بينما ثلاثة مستشفيات أخرى لم تستطع. مثابرتهم وتقنيتهم المتطورة أعطتني إجابات وخطة علاج غيرت حياتي.",
            },
            {
              name: "يوسف محمود",
              text: "أتيت لاستبدال ركبة وكنت مرعوباً. فريق العظام جعلني أشعر بالثقة والرعاية. بعد ستة أشهر، أنا أتنزه مجدداً. رعاية حقيقية معجزة.",
            },
          ],
        },
        faq: {
          tagline: "أسئلة شائعة",
          title: "الأسئلة",
          titleHighlight: "الأكثر تكراراً",
          subtitle:
            "اعثر على إجابات لأكثر الأسئلة شيوعاً حول خدماتنا ومرافقنا.",
          items: [
            {
              q: "كيف أحجز موعداً؟",
              a: "يمكنك الحجز عبر الإنترنت من خلال موقعنا، أو الاتصال بخطنا الساخن على مدار الساعة، أو استخدام خدمة الواتساب. المواعيد في نفس اليوم متاحة غالباً للحالات العاجلة.",
            },
            {
              q: "هل تقبلون التأمين الدولي؟",
              a: "نعم، نتعامل مع جميع شركات التأمين الدولية الكبرى. فريق التأمين المخصص لدينا يتولى جميع الأوراق والموافقات المسبقة نيابة عنك.",
            },
            {
              q: "ما هي أوقات الزيارة؟",
              a: "أوقات الزيارة العامة من 10:00 صباحاً إلى 8:00 مساءً يومياً. وحدات العناية المركزة لديها أوقات زيارة مخصصة. يمكن ترتيب مواعيد خاصة عند الطلب.",
            },
            {
              q: "هل الرعاية الطارئة متاحة 24/7؟",
              a: "بالتأكيد. قسم الطوارئ لدينا يعمل على مدار الساعة مع فرق صدمات متخصصة ودعم حياة متقدم ووصول مباشر إلى جميع الأقسام التخصصية.",
            },
            {
              q: "هل تقدمون استشارات عن بُعد؟",
              a: "نعم، نقدم استشارات فيديو آمنة مع معظم أخصائيينا. يمكن حجز مواعيد الطب عن بُعد من خلال نفس قنوات حجز الزيارات الشخصية.",
            },
          ],
        },
        contact: {
          tagline: "تواصل معنا",
          title: "نحن هنا",
          titleHighlight: "من أجلك",
          subtitle:
            "سواء كان طارئاً أو استفساراً روتينياً، فريقنا مستعد لمساعدتك على مدار 24 ساعة.",
          form: {
            name: "الاسم الكامل",
            email: "البريد الإلكتروني",
            phone: "رقم الهاتف",
            message: "كيف يمكننا المساعدة؟",
            submit: "إرسال الرسالة",
            success: "تم إرسال الرسالة بنجاح!",
          },
          info: {
            address: "١٢٦ كورنيش النيل، القاهرة، مصر",
            phone: "+20 108 076 1700",
            email: "care@alamed-hospital.com",
            hours: "مفتوح ٢٤/٧",
          },
        },
        chatbot: {
          title: "مساعد الأعمد الذكي",
          subtitle: "مدعوم بالذكاء الطبي",
          placeholder: "اسأل عن خدماتنا، أطبائنا، أو الحجز...",
          greeting:
            "مرحباً! أنا مساعد الأعمد الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك السؤال عن تخصصاتنا، أطبائنا، أو حجز موعد.",
          quickQuestions: ["احجز موعد", "أطبائنا", "ساعات العمل", "الطوارئ"],
        },
        footer: {
          rights: "جميع الحقوق محفوظة.",
          tagline: "نشفي بالتعاطف، والابتكار، والتميز.",
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

/* ═══════════════════════════════════════════════════════════════
   Animation Variants
   ═══════════════════════════════════════════════════════════════ */
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

// scaleIn is used implicitly by consumers referencing this constant
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════════════════════════
   Scroll Progress Bar
   ═══════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #0055FF, #00CCFF)" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   Floating Orbs (Background Atmosphere)
   ═══════════════════════════════════════════════════════════════ */
function FloatingOrbs() {
  const orbs = useMemo(
    () => [
      {
        size: 300,
        x: "10%",
        y: "20%",
        color: "rgba(0,85,255,0.04)",
        duration: 20,
      },
      {
        size: 200,
        x: "80%",
        y: "60%",
        color: "rgba(0,204,255,0.05)",
        duration: 25,
      },
      {
        size: 250,
        x: "60%",
        y: "10%",
        color: "rgba(0,85,255,0.03)",
        duration: 30,
      },
      {
        size: 180,
        x: "30%",
        y: "80%",
        color: "rgba(0,204,255,0.04)",
        duration: 22,
      },
    ],
    [],
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Section Tag Component
   ═══════════════════════════════════════════════════════════════ */
function SectionTag({ text, isRTL }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
    >
      <Sparkles className="w-4 h-4" />
      <span>{text}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Navigation
   ═══════════════════════════════════════════════════════════════ */
function Navigation({ lang, toggleLang, isRTL }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["home", "specialties", "doctors", "about", "contact"];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-500/5 border-b border-blue-100/50" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-20 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {/* Logo */}
          <motion.div
            className={`flex items-center gap-3 cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
            onClick={() => scrollTo("home")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                Al-Amed
              </span>
              <span className="block text-[10px] text-blue-400 font-medium tracking-[0.2em] uppercase">
                Hospital
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div
            className={`hidden lg:flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item === "about" ? "about" : item)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50/80 transition-all duration-300"
              >
                {t(`nav.${item}`)}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div
            className={`hidden lg:flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50/80 transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === "en" ? "العربية" : "English"}</span>
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("contact")}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
            >
              {t("nav.book")}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {mobileOpen ?
              <X className="w-6 h-6 text-slate-700" />
            : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-blue-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item === "about" ? "about" : item)}
                  className="block w-full text-left px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {t(`nav.${item}`)}
                </button>
              ))}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={toggleLang}
                  className="flex-1 px-4 py-3 text-center text-blue-600 bg-blue-50 rounded-lg font-medium"
                >
                  {lang === "en" ? "العربية" : "English"}
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex-1 px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-medium"
                >
                  {t("nav.book")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════════════════════════ */
function HeroSection({ isRTL }) {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center pt-24"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover scale-105"
          poster="/hero-bg.jpg"
        >
          <source
            src="https://res.cloudinary.com/dfhecwiib/video/upload/v1779546084/hero-video_vbhgqb.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-white/72" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top right, rgba(0,85,255,0.16), transparent 35%),
              radial-gradient(circle at bottom left, rgba(0,212,255,0.12), transparent 35%),
              linear-gradient(to bottom, rgba(255,255,255,0.72), rgba(255,255,255,0.94))
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,85,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,85,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`${isRTL ? "lg:order-2 text-right" : "text-left"}`}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 ${isRTL ? "flex-row-reverse" : ""}`}
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(0,85,255,0.12)",
                boxShadow: "0 10px 30px rgba(0,85,255,0.05)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs sm:text-sm tracking-[0.18em] uppercase font-bold text-blue-700">
                Advanced Medical Excellence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 1 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-[92px] leading-[0.95] tracking-[-0.04em] font-light mb-7"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#081226",
              }}
            >
              Exceptional
              <br />
              <span
                className="italic font-light"
                style={{
                  background:
                    "linear-gradient(135deg, #0055FF 0%, #00B8FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Healthcare Experience
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 max-w-xl mb-10"
            >
              Delivering world-class medical services with advanced technology,
              compassionate care, and a premium patient experience designed for
              your comfort and recovery.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 1 }}
              className={`flex flex-wrap gap-4 ${isRTL ? "justify-end" : ""}`}
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl px-7 sm:px-8 py-4 text-sm sm:text-base font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #0055FF 0%, #003ECC 100%)",
                  boxShadow: "0 20px 40px rgba(0,85,255,0.28)",
                }}
              >
                <span className="relative z-10">Book An Appointment</span>
                <ArrowRight
                  size={18}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  }}
                />
              </motion.a>

              <motion.a
                href="#specialties"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 sm:px-8 py-4 rounded-2xl text-sm sm:text-base font-semibold backdrop-blur-xl border border-white/70 text-slate-700"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                }}
              >
                Explore Services
                <ChevronDown size={18} />
              </motion.a>
            </motion.div>

            {/* Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className={`mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500 ${isRTL ? "justify-end" : ""}`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                <span>JCI Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-500" />
                <span>International Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-cyan-500" />
                <span>24/7 Emergency Care</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Medical Monitor Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`relative hidden lg:block ${isRTL ? "lg:order-1" : ""}`}
          >
            <div
              className="relative overflow-hidden rounded-[38px] p-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(248,252,255,0.72))",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow:
                  "0 40px 120px rgba(37,99,235,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              {/* Background Glows */}
              <motion.div
                className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(37,99,235,0.22), rgba(56,189,248,0.06), transparent 70%)",
                }}
                animate={{ scale: [1, 1.12, 1], rotate: [0, 10, 0] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-32 -left-24 w-[320px] h-[320px] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34,211,238,0.16), transparent 70%)",
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Top Bar */}
              <div className="relative flex items-start justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 border border-sky-100 bg-white/70">
                    <motion.span
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="w-2.5 h-2.5 rounded-full bg-emerald-500"
                    />
                    <span className="text-[11px] tracking-[0.18em] uppercase font-bold text-sky-700">
                      Live Medical Monitoring
                    </span>
                  </div>
                  <h3 className="text-[30px] leading-tight font-bold text-slate-900">
                    AI Smart Healthcare System
                  </h3>
                  <p className="text-slate-500 mt-3 text-[15px] leading-7 max-w-[480px]">
                    Advanced real-time monitoring platform designed for premium
                    medical experiences and modern patient care.
                  </p>
                </div>

                {/* Heart Core */}
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.9], opacity: [0.45, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-3xl bg-sky-400 blur-md"
                  />
                  <div
                    className="relative w-[72px] h-[72px] rounded-[24px] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)",
                      boxShadow: "0 20px 45px rgba(37,99,235,0.30)",
                    }}
                  >
                    <motion.div
                      animate={{ scaleY: [1, 0.82, 1], scaleX: [1, 1.08, 1] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <HeartPulse className="text-white" size={30} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* ECG Area */}
              <div
                className="relative overflow-hidden rounded-[28px] border border-sky-100 h-[130px] mb-8"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(37,99,235,0.04), rgba(56,189,248,0.03))",
                }}
              >
                {/* Grid */}
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #38bdf8 1px, transparent 1px),
                      linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
                    `,
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Light Sweep */}
                <motion.div
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-[35%] blur-3xl"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(56,189,248,0.22), transparent)",
                  }}
                />
                {/* ECG Line */}
                <motion.div
                  className="absolute inset-0 w-[200%]"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <svg
                    viewBox="0 0 1200 130"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="line" x1="0" y1="0" x2="1200" y2="0">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="50%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                    <path
                      d="
                        M0 65 L120 65 L145 65 L170 45 L190 90 L220 18 L250 65 L390 65
                        L430 65 L455 48 L480 82 L510 28 L540 65 L600 65
                        M600 65 L720 65 L745 65 L770 45 L790 90 L820 18 L850 65 L990 65
                        L1030 65 L1055 48 L1080 82 L1110 28 L1140 65 L1200 65
                      "
                      fill="none"
                      stroke="url(#line)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Bottom Info */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mt-7 rounded-[24px] p-5 flex items-center gap-4"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(37,99,235,0.08)",
                }}
              >
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                  }}
                >
                  <CheckCircle size={22} color="#fff" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-[15px]">
                    International Medical Accreditation
                  </div>
                  <div className="text-sm text-slate-500 mt-1 leading-6">
                    Globally trusted healthcare standards with premium patient
                    safety.
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-6 right-6 px-5 py-3 rounded-full text-white text-xs font-bold shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                }}
              >
                #1 Smart Medical Center
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-semibold">
          Scroll
        </span>
        <ChevronDown size={16} className="text-slate-400" />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Stats Section
   ═══════════════════════════════════════════════════════════════ */
function Counter({ from, to, isInView, suffix }) {
  const nodeRef = useRef();
  const motionVal = useMotionValue(from);
  const springVal = useSpring(motionVal, { duration: 2500, bounce: 0 });

  useEffect(() => {
    if (isInView) motionVal.set(to);
  }, [isInView, to, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (v) => {
      if (nodeRef.current)
        nodeRef.current.textContent = Math.floor(v).toLocaleString() + suffix;
    });
    return unsubscribe;
  }, [springVal, suffix]);

  return (
    <span ref={nodeRef}>
      {from.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatsSection({ isRTL }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 50000, suffix: "+", label: t("hero.stats.patients"), icon: Users },
    {
      value: 120,
      suffix: "+",
      label: t("hero.stats.doctors"),
      icon: Stethoscope,
    },
    { value: 25, suffix: "+", label: t("hero.stats.years"), icon: Award },
    { value: 35, suffix: "+", label: t("hero.stats.awards"), icon: Star },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 ${isRTL ? "text-right" : "text-left"}`}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 25px 50px rgba(0,85,255,0.1)",
              }}
              className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-blue-500/5 border border-blue-100/60"
            >
              <div
                className={`flex items-center gap-3 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-1">
                <Counter
                  from={0}
                  to={stat.value}
                  isInView={isInView}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm text-slate-500 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Specialties Section
   ═══════════════════════════════════════════════════════════════ */

// Module-level translations for SpecialtiesSection and BookingSection
// (kept separate from i18n useTranslation to preserve original behavior)
const specialtiesSectionTranslations = {
  en: {
    badge: "Advanced Medical Systems",
    heading: "Our Specialties",
    sub: "Next-generation medical intelligence powered by artificial intelligence, cinematic diagnostics, and futuristic healthcare systems.",
    cta: "Explore specialty",
    cards: [
      {
        id: "01",
        title: "Oncology Intelligence",
        desc: "AI-powered early detection and precise microscopic analysis for oncology diagnostics.",
        stats: ["98.7% Accuracy", "AI Enhanced", "Live Analysis"],
        image: "https://i.postimg.cc/ydt1J7sq/specialty-internal.jpg",
      },
      {
        id: "02",
        title: "Neural Mapping",
        desc: "Advanced brain topology visualization and neurological diagnostic systems.",
        stats: ["3D Mapping", "Neural Scan", "Smart Detection"],
        image: "https://i.postimg.cc/FHphyyNC/specialty-neurology.jpg",
      },
      {
        id: "03",
        title: "Cardiac Analysis",
        desc: "Real-time cardiac imaging with AI anomaly detection and predictive monitoring.",
        stats: ["Heart Monitor", "AI Prediction", "Realtime ECG"],
        image: "https://i.postimg.cc/KzzSrwJD/specialty-cardiology.jpg",
      },
    ],
  },
  ar: {
    badge: "أنظمة طبية متقدمة",
    heading: "تخصصاتنا",
    sub: "ذكاء طبي من الجيل القادم مدعوم بالذكاء الاصطناعي وأنظمة التشخيص السينمائية والرعاية الصحية المستقبلية.",
    cta: "استكشف التخصص",
    cards: [
      {
        id: "01",
        title: "ذكاء علم الأورام",
        desc: "كشف مبكر مدعوم بالذكاء الاصطناعي وتحليل مجهري دقيق لتشخيصات الأورام.",
        stats: ["دقة 98.7%", "AI معزّز", "تحليل مباشر"],
        image:
          "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80",
      },
      {
        id: "02",
        title: "رسم الخرائط العصبية",
        desc: "تصوير متقدم لطبولوجيا الدماغ وأنظمة التشخيص العصبي.",
        stats: ["خرائط ثلاثية الأبعاد", "مسح عصبي", "كشف ذكي"],
        image:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
      },
      {
        id: "03",
        title: "تحليل القلب",
        desc: "تصوير قلبي في الوقت الفعلي مع كشف الشذوذات بالذكاء الاصطناعي والمراقبة التنبؤية.",
        stats: ["مراقبة القلب", "توقعات AI", "رسم قلب فوري"],
        image:
          "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=900&q=80",
      },
    ],
  },
};

// Icon map for specialty cards
const SPECIALTY_ICONS = { "01": Microscope, "02": Brain, "03": Activity };

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function SpecialtyCard({ card, index, cta, isRTL }) {
  const [ref, visible] = useReveal(0.08);
  const Icon = SPECIALTY_ICONS[card.id];
  const flipImage = index % 2 === 1;

  return (
    <article
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(7px)",
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s ease ${index * 0.12}s`,
      }}
      className="group grid grid-cols-1 lg:grid-cols-2 border border-gray-100 rounded-2xl overflow-hidden bg-white"
    >
      {/* Image */}
      <div
        className={[
          "relative overflow-hidden",
          "h-64 lg:h-auto",
          flipImage && !isRTL ? "lg:order-last" : "",
          !flipImage && isRTL ? "lg:order-last" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-cyan-50/0 group-hover:bg-cyan-50/20 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-9 lg:p-14 xl:p-16">
        {/* Top row: icon + number */}
        <div className="flex items-start justify-between mb-10">
          <div className="w-11 h-11 rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0">
            <Icon
              size={20}
              strokeWidth={1.5}
              className="text-cyan-500"
              aria-hidden
            />
          </div>
          <span
            className="text-[4.5rem] leading-none font-thin text-gray-100 select-none tabular-nums"
            aria-hidden
          >
            {card.id}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1">
          <div className="w-8 h-px bg-cyan-400 mb-6" />
          <h3 className="text-2xl lg:text-[1.85rem] xl:text-4xl font-light text-gray-900 tracking-tight leading-snug mb-4">
            {card.title}
          </h3>
          <p className="text-gray-400 text-[0.95rem] lg:text-base leading-relaxed font-light">
            {card.desc}
          </p>
        </div>

        {/* Bottom row: stats + cta */}
        <div className="mt-10 space-y-6">
          <div className="flex flex-wrap gap-2">
            {card.stats.map((s) => (
              <span
                key={s}
                className="inline-block px-3 py-1 text-xs text-gray-400 border border-gray-100 rounded-full tracking-wide"
              >
                {s}
              </span>
            ))}
          </div>
          <button
            className={[
              "inline-flex items-center gap-2 text-sm font-medium",
              "text-gray-700 border border-gray-200 rounded-full",
              "px-5 py-2.5",
              "hover:border-cyan-300 hover:text-cyan-600",
              "transition-all duration-200 ease-out",
              "group/btn",
            ].join(" ")}
          >
            {cta}
            <ArrowRight
              size={13}
              strokeWidth={1.8}
              className={[
                "transition-transform duration-200",
                isRTL ?
                  "group-hover/btn:-translate-x-0.5 rotate-180"
                : "group-hover/btn:translate-x-0.5",
              ].join(" ")}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </article>
  );
}

export function SpecialtiesSection({ locale = "en" }) {
  const tr =
    specialtiesSectionTranslations[locale] ?? specialtiesSectionTranslations.en;
  const isRTL = locale === "ar";
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section
      id="specialties"
      dir={isRTL ? "rtl" : "ltr"}
      className="relative bg-white py-28 lg:py-40 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #F9FAFB 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <header
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0px)" : "translateY(7px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
          className="mb-20 lg:mb-28"
        >
          <div
            className={[
              "inline-flex items-center gap-3 mb-8",
              isRTL ? "flex-row-reverse" : "",
            ].join(" ")}
          >
            <div className="w-5 h-px bg-cyan-400 flex-shrink-0" aria-hidden />
            <span className="text-[0.7rem] tracking-[0.22em] uppercase text-gray-400 font-medium">
              {tr.badge}
            </span>
          </div>

          <h2
            className={[
              "font-thin text-gray-900 leading-[1.04] tracking-[-0.04em]",
              "text-5xl sm:text-6xl lg:text-8xl xl:text-9xl",
              "mb-7",
            ].join(" ")}
          >
            {tr.heading}
          </h2>

          <div className="w-full h-px bg-gray-100 mb-7" aria-hidden />

          <p
            className={[
              "text-gray-400 text-base lg:text-lg leading-relaxed font-light",
              "max-w-xl",
              isRTL ? "mr-0" : "",
            ].join(" ")}
          >
            {tr.sub}
          </p>
        </header>

        {/* Cards */}
        <div className="flex flex-col gap-5 lg:gap-6">
          {tr.cards.map((card, i) => (
            <SpecialtyCard
              key={card.id}
              card={card}
              index={i}
              cta={tr.cta}
              isRTL={isRTL}
            />
          ))}
        </div>

        {/* Footer Rule */}
        <div
          className="mt-20 lg:mt-28 flex items-center gap-4"
          aria-hidden
          style={{
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.7s ease 0.5s",
          }}
        >
          <div className="flex-1 h-px bg-gray-100" />
          <div className="w-1 h-1 rounded-full bg-cyan-400" />
          <div className="flex-1 h-px bg-gray-100" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Why Us Section
   ═══════════════════════════════════════════════════════════════ */
function WhyUsSection({ isRTL }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const icons = [Clock, Sparkles, Heart, Shield];

  return (
    <section id="about" className="relative py-20 bg-[#fcfcfd] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={`absolute top-[-10%] ${isRTL ? "right-[-5%]" : "left-[-5%]"} w-[30%] aspect-square bg-blue-50/50 rounded-full blur-[120px]`}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`relative ${isRTL ? "lg:order-2" : ""}`}
          >
            <div className="relative inline-block w-full">
              {/* Main Video Frame */}
              <div className="relative z-10 aspect-[16/10] sm:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm border border-slate-200/60 bg-white">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source
                    src="https://res.cloudinary.com/dfhecwiib/video/upload/v1779543080/11b8bf7b-5957-4846-8f9f-7b1159f71e13_2_by9zus.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-slate-900/5" />
              </div>

              {/* Thumbnail Overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={`absolute -bottom-4 sm:-bottom-8 ${isRTL ? "-right-4 sm:-right-8" : "-left-4 sm:-left-8"} z-20 w-32 h-32 sm:w-56 sm:h-40 rounded-2xl overflow-hidden border-[6px] border-white shadow-xl shadow-slate-200/50`}
              >
                <img
                  src="/hero-bg.jpg"
                  alt="Hospital facility"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </motion.div>

              {/* JCI Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute -top-4 ${isRTL ? "left-4 sm:left-10" : "right-4 sm:right-10"} z-30 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-100 flex items-center gap-2`}
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700 tracking-wider">
                  JCI ACCREDITED
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`${isRTL ? "lg:order-1 text-right" : "text-left"}`}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="text-blue-600 text-sm font-bold tracking-[0.2em] uppercase">
                {t("whyUs.tagline")}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-5xl font-semibold text-slate-900 mb-6 leading-tight"
            >
              {t("whyUs.title")} <br />
              <span className="text-slate-400 font-light italic">
                {t("whyUs.titleHighlight")}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-slate-500 mb-12 max-w-xl leading-relaxed"
            >
              {t("whyUs.subtitle")}
            </motion.p>

            <div className="grid gap-8">
              {t("whyUs.features", { returnObjects: true }).map((feat, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className={`flex items-start gap-5 group ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1 transition-colors group-hover:text-blue-700">
                        {feat.title}
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Doctors Section
   ═══════════════════════════════════════════════════════════════ */
function DoctorsSection({ isRTL }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const images = [
    "https://i.postimg.cc/3JZ9jBbv/doctor-1.jpg",
    "https://i.postimg.cc/fbYvLfXM/34c7db38-493b-4b70-aa89-0a1a505e7a2b.png",
    "https://i.postimg.cc/C57D8vLz/doctor-3.jpg",
    "https://i.postimg.cc/Jn23YYCx/7d086d5c-a527-4787-8332-7df2acf44f58.png",
  ];

  return (
    <section id="doctors" className="relative py-28 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`mb-16 ${isRTL ? "text-right" : "text-left"}`}
        >
          <SectionTag text={t("doctors.tagline")} isRTL={isRTL} />
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="text-slate-900">{t("doctors.title")}</span>{" "}
            <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              {t("doctors.titleHighlight")}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-600 max-w-2xl"
          >
            {t("doctors.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid cursor-pointer sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t("doctors.items", { returnObjects: true }).map((doc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -12 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-blue-500/5 border border-blue-100/60 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-500"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={images[i]}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
              </div>
              <div className={`p-5 ${isRTL ? "text-right" : "text-left"}`}>
                <h4 className="text-lg font-bold text-slate-900 mb-0.5">
                  {doc.name}
                </h4>
                <p className="text-sm text-blue-600 font-medium mb-2">
                  {doc.role}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {doc.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Testimonials Section
   ═══════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardStep, setCardStep] = useState(0);

  const autoPlayRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) setVisibleCards(4);
      else if (window.innerWidth >= 1024) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonialsData = [
    {
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      roleAr: "مريض قلب",
      roleEn: "Cardiology Patient",
      titleAr: "تجربة ممتازة جدًا",
      titleEn: "Excellent Experience",
      reviewAr:
        "الخدمة كانت ممتازة جدًا من أول الاستقبال حتى المتابعة بعد الكشف، وفريق العمل كان محترم وواعي جدًا.",
      reviewEn:
        "Excellent service from reception to follow-up. The team was professional and caring.",
      rating: "5.0",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
      roleAr: "ولي أمر",
      roleEn: "Parent",
      titleAr: "رعاية احترافية",
      titleEn: "Professional Care",
      reviewAr:
        "المكان نظيف جدًا والتنظيم ممتاز، والدكاترة شرحوا كل حاجة بهدوء واحترافية.",
      reviewEn:
        "Very clean environment and excellent organization. The doctors explained everything clearly.",
      rating: "4.9",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=800&auto=format&fit=crop",
      roleAr: "مريض أعصاب",
      roleEn: "Neurology Patient",
      titleAr: "اهتمام بالتفاصيل",
      titleEn: "Attention to Details",
      reviewAr:
        "التجربة كانت مريحة جدًا، والخدمة سريعة، وحسيت باهتمام حقيقي بكل التفاصيل الطبية.",
      reviewEn:
        "A very comfortable experience with fast service and real attention to every medical detail.",
      rating: "5.0",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=800&auto=format&fit=crop",
      roleAr: "مريض جراحة",
      roleEn: "Surgery Patient",
      titleAr: "أفضل تجربة علاج",
      titleEn: "Best Treatment Experience",
      reviewAr:
        "التعامل كان راقي جدًا والمتابعة بعد العملية كانت ممتازة، وحسيت براحة وثقة كبيرة.",
      reviewEn:
        "Very respectful staff and excellent follow-up after surgery. I felt comfortable and confident.",
      rating: "4.8",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=800&auto=format&fit=crop",
      roleAr: "مريض جلدية",
      roleEn: "Dermatology Patient",
      titleAr: "سرعة وتنظيم",
      titleEn: "Fast & Organized",
      reviewAr:
        "الحجز كان سريع جدًا، وكل حاجة كانت منظمة بشكل ممتاز من أول الدخول لحد الخروج.",
      reviewEn:
        "Booking was fast and everything was organized perfectly from check-in to checkout.",
      rating: "5.0",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
      roleAr: "مريض عيون",
      roleEn: "Ophthalmology Patient",
      titleAr: "مستوى راقي",
      titleEn: "Premium Quality",
      reviewAr:
        "المستشفى على مستوى عالي جدًا من النظافة والاهتمام، والتعامل كان مريح جدًا.",
      reviewEn:
        "A very high-quality hospital with great cleanliness and a comfortable experience.",
      rating: "4.9",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      roleAr: "مريض عظام",
      roleEn: "Orthopedic Patient",
      titleAr: "راحة وثقة",
      titleEn: "Comfort & Trust",
      reviewAr:
        "الدكاترة محترفين جدًا، وحسيت براحة وثقة كبيرة أثناء العلاج والمتابعة.",
      reviewEn:
        "Highly professional doctors, and I felt very comfortable and reassured throughout treatment.",
      rating: "5.0",
    },
  ];

  const translatedTestimonials = t("testimonials.items", {
    returnObjects: true,
  });

  const TESTIMONIALS = useMemo(() => {
    return testimonialsData.map((item, index) => ({
      ...(Array.isArray(translatedTestimonials) ?
        translatedTestimonials[index] || {}
      : {}),
      avatar: item.avatar,
      rating: item.rating,
      role: i18n.language === "ar" ? item.roleAr : item.roleEn,
      title: i18n.language === "ar" ? item.titleAr : item.titleEn,
      review: i18n.language === "ar" ? item.reviewAr : item.reviewEn,
      name:
        (
          Array.isArray(translatedTestimonials) &&
          translatedTestimonials[index]?.name
        ) ?
          translatedTestimonials[index].name
        : i18n.language === "ar" ? "مريض"
        : "Patient",
    }));
  }, [translatedTestimonials, i18n.language]);

  const maxStartIndex = Math.max(0, TESTIMONIALS.length - visibleCards);

  useEffect(() => {
    const measureCardStep = () => {
      const firstCard = trackRef.current?.children?.[0];
      if (!firstCard) return;
      setCardStep(firstCard.getBoundingClientRect().width);
    };

    measureCardStep();
    window.addEventListener("resize", measureCardStep);

    return () => window.removeEventListener("resize", measureCardStep);
  }, [visibleCards, TESTIMONIALS.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, maxStartIndex]);

  useEffect(() => {
    if (currentIndex > maxStartIndex) setCurrentIndex(maxStartIndex);
  }, [currentIndex, maxStartIndex]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goNext = () => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev <= 0 ? maxStartIndex : prev - 1));
  };

  const goTo = (index) => {
    pauseAutoPlay();
    setCurrentIndex(Math.min(index, maxStartIndex));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const threshold = 50;

    setIsAutoPlaying(true);

    if (Math.abs(swipeDistance) < threshold) return;

    if (swipeDistance > 0) goNext();
    else goPrev();
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-light-blue-bg py-[90px] lg:py-[130px]"
    >
      <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-hospital-blue/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block font-body text-[12px] font-semibold tracking-[4px] uppercase text-hospital-blue mb-5">
            {t("testimonials.tagline")}
          </span>
          <h2 className="font-display text-[38px] lg:text-[56px] leading-[1.05] text-text-primary font-light">
            {t("testimonials.title")}{" "}
            <span className="text-hospital-blue">
              {t("testimonials.titleHighlight")}
            </span>
          </h2>
          <p className="max-w-[760px] mx-auto mt-6 text-[15px] lg:text-[17px] leading-[1.9] text-gray-600">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        <div
          className="relative touch-pan-y select-none"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * cardStep}px)`,
                transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform",
              }}
            >
              {TESTIMONIALS.map((item, index) => (
                <div
                  key={index}
                  style={{ flex: `0 0 ${100 / visibleCards}%` }}
                  className="px-3"
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-[28px] border border-white/50 bg-white/90 backdrop-blur-xl p-8 lg:p-9 shadow-[0_10px_40px_rgba(0,0,0,0.07)] h-full"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-hospital-blue/5 via-transparent to-cyan-400/5" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <Quote className="w-10 h-10 text-hospital-blue/20" />
                        <div className="text-[14px] font-semibold text-hospital-blue">
                          {item.rating}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-5">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      <h3 className="text-[20px] font-semibold text-text-primary mb-4 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[15px] leading-[1.9] text-gray-600 mb-8 min-h-[130px]">
                        {item.review}
                      </p>

                      <div className="border-t border-grey-border pt-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            loading="lazy"
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-hospital-blue/10 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-semibold text-[15px] text-text-primary truncate">
                              {item.name}
                            </div>
                            <div className="text-[13px] text-gray-500 truncate">
                              {item.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 lg:-translate-x-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl border border-grey-border flex items-center justify-center shadow-lg hover:bg-hospital-blue hover:text-white hover:border-hospital-blue transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={goNext}
            disabled={currentIndex === maxStartIndex}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 lg:translate-x-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl border border-grey-border flex items-center justify-center shadow-lg hover:bg-hospital-blue hover:text-white hover:border-hospital-blue transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-10">
          {Array.from({ length: maxStartIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-500 rounded-full ${
                i === currentIndex ?
                  "w-8 h-2 bg-hospital-blue"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
/* ═══════════════════════════════════════════════════════════════
   FAQ Section
   ═══════════════════════════════════════════════════════════════ */
function FAQSection({ isRTL }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIdx, setOpenIdx] = useState(null);
  const items = t("faq.items", { returnObjects: true });

  return (
    <section className="relative py-28 overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`mb-16 ${isRTL ? "text-right" : "text-left"}`}
        >
          <SectionTag text={t("faq.tagline")} isRTL={isRTL} />
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="text-slate-900">{t("faq.title")}</span>{" "}
            <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
              {t("faq.titleHighlight")}
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-600">
            {t("faq.subtitle")}
          </motion.p>
        </motion.div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-blue-100/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className={`w-full flex items-center justify-between p-5 text-left hover:bg-blue-50/50 transition-colors ${isRTL ? "flex-row-reverse text-right" : ""}`}
              >
                <span className="font-semibold text-slate-900 pr-4">
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-blue-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className={`px-5 pb-5 text-slate-600 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Booking Section
   ═══════════════════════════════════════════════════════════════ */
export function BookingSection({ isRtl = true }) {
  const { i18n } = useTranslation();

  const locale = i18n.language === "ar" ? "ar" : "en";
  // Local translations scoped to this component
  const t = {
    ar: {
      eyebrow: "حجز موعد",
      title: "احجز موعدك في دقائق",
      subtitle:
        "اختر التخصص، ثم أي طبيب متاح، وبعدها الوقت المناسب، وأكمل بياناتك بسهولة.",
      panelTitle: "رعاية طبية تبدأ بحجز سهل",
      panelSubtitle:
        "واجهة حجز واضحة، سريعة، ومريحة تناسب مواقع المستشفيات الحديثة.",
      step1: "التخصص",
      step2: "الطبيب",
      step3: "الوقت",
      step4: "البيانات",
      selectSpecialty: "اختر التخصص",
      selectDoctor: "اختر الطبيب",
      selectTime: "اختر الموعد",
      completeDetails: "أكمل البيانات",
      anyDoctor: "أي طبيب متاح",
      next: "التالي",
      back: "رجوع",
      submit: "تأكيد الحجز",
      successTitle: "تم تأكيد الحجز بنجاح",
      successDesc: "سيتم التواصل معك قريبًا لتأكيد الموعد.",
      newBooking: "حجز جديد",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      gender: "النوع",
      male: "ذكر",
      female: "أنثى",
      dob: "تاريخ الميلاد",
      notes: "ملاحظات",
      notesPlaceholder: "اكتب أي ملاحظات إضافية...",
      privacyAgree: "أوافق على سياسة الخصوصية",
      errors: {
        required: "هذا الحقل مطلوب",
        phoneInvalid: "رقم الهاتف غير صحيح",
        agreePrivacy: "يجب الموافقة على سياسة الخصوصية",
        selectSpecialty: "اختر التخصص أولاً",
        selectTime: "اختر الوقت أولاً",
      },
      specialties: {
        cardio: "القلب",
        internal: "الباطنة",
        neuro: "الأعصاب",
        pediatrics: "الأطفال",
        orthopedics: "العظام",
        surgery: "الجراحة العامة",
        urology: "المسالك البولية",
        gynecology: "النساء والتوليد",
        nephrology: "الكلى",
        vascular: "جراحة الأوعية",
      },
      selected: "تم الاختيار",
    },
    en: {
      eyebrow: "Appointment Booking",
      title: "Book Your Appointment in Minutes",
      subtitle:
        "Choose the specialty, then any available doctor, then the right time, and complete your details easily.",
      panelTitle: "Medical care starts with easy booking",
      panelSubtitle:
        "A clean, fast, and friendly booking interface for modern hospital websites.",
      step1: "Specialty",
      step2: "Doctor",
      step3: "Time",
      step4: "Details",
      selectSpecialty: "Select Specialty",
      selectDoctor: "Select Doctor",
      selectTime: "Select Time",
      completeDetails: "Complete Details",
      anyDoctor: "Any Available Doctor",
      next: "Next",
      back: "Back",
      submit: "Confirm Booking",
      successTitle: "Booking confirmed successfully",
      successDesc: "We will contact you soon to confirm your appointment.",
      newBooking: "New Booking",
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email",
      gender: "Gender",
      male: "Male",
      female: "Female",
      dob: "Date of Birth",
      notes: "Notes",
      notesPlaceholder: "Write any additional notes...",
      privacyAgree: "I agree to the privacy policy",
      errors: {
        required: "This field is required",
        phoneInvalid: "Invalid phone number",
        agreePrivacy: "You must agree to the privacy policy",
        selectSpecialty: "Please select a specialty first",
        selectTime: "Please select a time first",
      },
      specialties: {
        cardio: "Cardiology",
        internal: "Internal Medicine",
        neuro: "Neurology",
        pediatrics: "Pediatrics",
        orthopedics: "Orthopedics",
        surgery: "General Surgery",
        urology: "Urology",
        gynecology: "Obstetrics & Gynecology",
        nephrology: "Nephrology",
        vascular: "Vascular Surgery",
      },
      selected: "Selected",
    },
  }[locale];

  const specialties = useMemo(
    () => [
      { id: "cardio", icon: "❤️" },
      { id: "internal", icon: "🫁" },
      { id: "neuro", icon: "🧠" },
      { id: "pediatrics", icon: "👶" },
      { id: "orthopedics", icon: "🦴" },
      { id: "surgery", icon: "🔪" },
      { id: "urology", icon: "🩺" },
      { id: "gynecology", icon: "🤰" },
      { id: "nephrology", icon: "💧" },
      { id: "vascular", icon: "🫀" },
    ],
    [],
  );

  const timeSlots = useMemo(
    () => [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ],
    [],
  );

  const steps = [t.step1, t.step2, t.step3, t.step4];

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [form, setForm] = useState({
    specialty: "",
    doctor: "any",
    date: "",
    time: "",
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    notes: "",
    agreePrivacy: false,
  });
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep = () => {
    const nextErrors = {};
    if (step === 1 && !form.specialty)
      nextErrors.specialty = t.errors.selectSpecialty;
    if (step === 3) {
      if (!form.date) nextErrors.date = t.errors.required;
      if (!form.time) nextErrors.time = t.errors.selectTime;
    }
    if (step === 4) {
      if (!form.fullName.trim()) nextErrors.fullName = t.errors.required;
      if (!form.phone.trim()) nextErrors.phone = t.errors.required;
      else if (!/^\+?[0-9]{8,15}$/.test(form.phone.replace(/\s+/g, "")))
        nextErrors.phone = t.errors.phoneInvalid;
      if (!form.agreePrivacy) nextErrors.agreePrivacy = t.errors.agreePrivacy;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 4));
  };
  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };
  const submit = () => {
    if (!validateStep()) return;
    setBookingRef(`#${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    setSuccess(true);
  };

  const cardMotion = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };
  const activeSpecialtyLabel =
    t.specialties[form.specialty] ||
    (locale === "ar" ? "غير محدد" : "Not selected");

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-[#edf7fb] px-4 py-8 md:px-6 md:py-10"
    >
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <div className="grid min-h-[900px] lg:grid-cols-[40%_60%]">
          {/* Left Panel */}
          <aside
            style={{
              backgroundImage: `
                linear-gradient(to bottom, rgba(7,25,45,0.45), rgba(10,88,140,0.35)),
                url("https://i.postimg.cc/NFNjgRLc/hospital-Background.png")
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="relative hidden overflow-hidden bg-gradient-to-br from-[#0b6aa8] via-[#0d83b8] to-[#22b8cf] px-8 py-12 text-white lg:flex lg:flex-col lg:justify-center"
          >
            <div className="absolute inset-0">
              <div className="absolute -left-24 bottom-[-50px] h-72 w-72 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute right-8 top-12 h-56 w-56 rounded-full bg-white/8 blur-2xl" />
              <div className="absolute left-[22%] top-[58%] h-40 w-40 rounded-full bg-white/6 blur-2xl" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`relative z-10 max-w-md ${isRtl ? "text-right" : "text-left"}`}
            >
              <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/15 bg-white/12 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
                <CalendarDays className="h-11 w-11 text-white/90" />
              </div>

              <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                {t.panelTitle}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-white/82">
                {t.panelSubtitle}
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-start gap-3 rounded-[22px] border border-white/12 bg-white/10 p-4 backdrop-blur-md">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-semibold">
                      {locale === "ar" ? "حجز آمن" : "Safe Booking"}
                    </h4>
                    <p className="mt-1 text-sm text-white/76">
                      {locale === "ar" ?
                        "خطوات واضحة وتجربة مريحة للمريض."
                      : "Clear steps and a comfortable patient experience."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[22px] border border-white/12 bg-white/10 p-4 backdrop-blur-md">
                  <Stethoscope className="mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-semibold">
                      {locale === "ar" ? "اختيار سريع" : "Fast Selection"}
                    </h4>
                    <p className="mt-1 text-sm text-white/76">
                      {locale === "ar" ?
                        "اختر التخصص ثم أكمل الحجز بسرعة."
                      : "Choose the specialty and finish quickly."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[22px] border border-white/12 bg-white/10 p-4 backdrop-blur-md">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-semibold">
                      {locale === "ar" ? "واجهة حديثة" : "Modern UI"}
                    </h4>
                    <p className="mt-1 text-sm text-white/76">
                      {locale === "ar" ?
                        "ألوان طبية هادئة: أزرق + سماوي."
                      : "Calm medical colors: blue + cyan."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div
              className={`relative z-10 mt-12 flex items-center gap-3 ${isRtl ? "justify-end" : "justify-start"}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/12">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div className={isRtl ? "text-right" : "text-left"}>
                <p className="text-sm">
                  {locale === "ar" ?
                    "واجهة حجز المرضى"
                  : "Patient Booking Interface"}
                </p>
                <p className="text-xs text-white/70">Medical Appointment UI</p>
              </div>
            </div>
          </aside>

          {/* Right Panel */}
          <main className="bg-white px-5 py-8 sm:px-8 md:px-10 lg:px-14 lg:py-10">
            {!success ?
              <div className="mx-auto max-w-[980px]">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`mb-10 ${isRtl ? "text-right" : "text-left"}`}
                >
                  <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-[#1b9dc4] uppercase">
                    {t.eyebrow}
                  </p>
                  <h1 className="text-3xl font-bold text-[#132235] md:text-5xl">
                    {t.title}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-[#617183] md:text-lg">
                    {t.subtitle}
                  </p>
                </motion.div>

                {/* Stepper */}
                <div className="mb-10 grid grid-cols-4 gap-3 sm:gap-6">
                  {steps.map((label, idx) => {
                    const num = idx + 1;
                    const active = step === num;
                    const done = step > num;
                    return (
                      <div key={label} className="flex flex-col">
                        <div className="flex items-center">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                              done ? "bg-emerald-500 text-white"
                              : active ?
                                "bg-[#1b9dc4] text-white shadow-[0_12px_24px_rgba(27,157,196,0.28)]"
                              : "bg-[#eaf2f8] text-[#88a0b5]"
                            }`}
                          >
                            {done ?
                              <Check className="h-4 w-4" />
                            : num}
                          </div>
                          {idx !== steps.length - 1 && (
                            <div className="mx-2 h-[2px] flex-1 rounded-full bg-[#dce8f1]">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-[#1b9dc4] to-[#22b8cf]"
                                initial={{ width: "0%" }}
                                animate={{ width: step > num ? "100%" : "0%" }}
                                transition={{ duration: 0.4 }}
                              />
                            </div>
                          )}
                        </div>
                        <span className="mt-2 text-xs font-medium text-[#617183] sm:text-sm">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={cardMotion}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    {step === 1 && (
                      <div>
                        <div className="mb-6 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef9fc] text-[#1b9dc4]">
                            <Sparkles className="h-5 w-5" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#132235]">
                            {t.selectSpecialty}
                          </h3>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                          {specialties.map((spec) => {
                            const active = form.specialty === spec.id;
                            return (
                              <button
                                key={spec.id}
                                onClick={() => update("specialty", spec.id)}
                                className={`group flex items-center gap-4 rounded-[22px] border px-5 py-5 text-start transition-all duration-300 hover:-translate-y-0.5 ${
                                  active ?
                                    "border-[#1b9dc4] bg-[#f5fbfe] shadow-[0_14px_30px_rgba(27,157,196,0.08)]"
                                  : "border-[#d9e5ee] bg-white hover:border-[#9ed8ea] hover:shadow-[0_14px_28px_rgba(15,23,42,0.05)]"
                                }`}
                              >
                                <div
                                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl transition-all ${
                                    active ?
                                      "bg-white text-[#1b9dc4]"
                                    : "bg-[#f0fbfd] text-[#1b9dc4]"
                                  }`}
                                >
                                  <span>{spec.icon}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div
                                    className={`text-lg font-semibold transition-colors ${
                                      active ? "text-[#0f172a]" : (
                                        "text-[#34435a]"
                                      )
                                    }`}
                                  >
                                    {t.specialties[spec.id]}
                                  </div>
                                  {active && (
                                    <div className="mt-1 text-xs font-medium text-[#1b9dc4]">
                                      {t.selected}
                                    </div>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {errors.specialty && (
                          <p className="mt-3 text-sm text-red-500">
                            {errors.specialty}
                          </p>
                        )}
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <div className="mb-6 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef9fc] text-[#1b9dc4]">
                            <User className="h-5 w-5" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#132235]">
                            {t.selectDoctor}
                          </h3>
                        </div>
                        <div className="rounded-[24px] border border-[#d9e5ee] bg-gradient-to-br from-white to-[#f6fbfe] p-5 md:p-6">
                          <button
                            onClick={() => update("doctor", "any")}
                            className={`flex w-full items-center gap-4 rounded-[20px] border px-5 py-5 text-start transition-all duration-300 hover:-translate-y-0.5 ${
                              form.doctor === "any" ?
                                "border-[#1b9dc4] bg-white shadow-[0_14px_30px_rgba(27,157,196,0.08)]"
                              : "border-[#d9e5ee] bg-white hover:border-[#9ed8ea]"
                            }`}
                          >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef9fc] text-[#1b9dc4]">
                              <Stethoscope className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-lg font-semibold text-[#132235]">
                                {t.anyDoctor}
                              </div>
                              <div className="mt-1 text-sm text-[#617183]">
                                {locale === "ar" ?
                                  "سيتم توجيه الحجز إلى أول طبيب متاح."
                                : "The booking will go to the first available doctor."
                                }
                              </div>
                            </div>
                            {form.doctor === "any" && (
                              <div className="rounded-full bg-[#1b9dc4]/10 px-3 py-1 text-xs font-semibold text-[#1b9dc4]">
                                {t.selected}
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div>
                        <div className="mb-6 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef9fc] text-[#1b9dc4]">
                            <Clock3 className="h-5 w-5" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#132235]">
                            {t.selectTime}
                          </h3>
                        </div>
                        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-[#617183]">
                              {locale === "ar" ?
                                "تاريخ الموعد"
                              : "Appointment Date"}
                            </label>
                            <input
                              type="date"
                              value={form.date}
                              onChange={(e) => update("date", e.target.value)}
                              className="w-full rounded-[18px] border border-[#d9e5ee] bg-white p-4 outline-none transition-all focus:border-[#1b9dc4] focus:ring-4 focus:ring-[#1b9dc4]/10"
                            />
                            {errors.date && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.date}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-[#617183]">
                              {locale === "ar" ?
                                "الموعد المتاح"
                              : "Available Time"}
                            </label>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
                              {timeSlots.map((slot) => {
                                const active = form.time === slot;
                                return (
                                  <button
                                    key={slot}
                                    onClick={() => update("time", slot)}
                                    className={`rounded-xl border py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                                      active ?
                                        "border-[#1b9dc4] bg-[#1b9dc4] text-white shadow-[0_10px_20px_rgba(27,157,196,0.22)]"
                                      : "border-[#d9e5ee] bg-white text-[#415266] hover:border-[#9ed8ea]"
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                );
                              })}
                            </div>
                            {errors.time && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.time}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div>
                        <div className="mb-6 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef9fc] text-[#1b9dc4]">
                            <FileText className="h-5 w-5" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#132235]">
                            {t.completeDetails}
                          </h3>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="md:col-span-2">
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#617183]">
                              <User className="h-4 w-4" />
                              {t.fullName}
                            </label>
                            <input
                              type="text"
                              value={form.fullName}
                              onChange={(e) =>
                                update("fullName", e.target.value)
                              }
                              className="w-full rounded-[18px] border border-[#d9e5ee] bg-white p-4 outline-none transition-all focus:border-[#1b9dc4] focus:ring-4 focus:ring-[#1b9dc4]/10"
                            />
                            {errors.fullName && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.fullName}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#617183]">
                              <Phone className="h-4 w-4" />
                              {t.phone}
                            </label>
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              className="w-full rounded-[18px] border border-[#d9e5ee] bg-white p-4 outline-none transition-all focus:border-[#1b9dc4] focus:ring-4 focus:ring-[#1b9dc4]/10"
                              placeholder="+201000000000"
                            />
                            {errors.phone && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#617183]">
                              <Mail className="h-4 w-4" />
                              {t.email}
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => update("email", e.target.value)}
                              className="w-full rounded-[18px] border border-[#d9e5ee] bg-white p-4 outline-none transition-all focus:border-[#1b9dc4] focus:ring-4 focus:ring-[#1b9dc4]/10"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-[#617183]">
                              {t.gender}
                            </label>
                            <select
                              value={form.gender}
                              onChange={(e) => update("gender", e.target.value)}
                              className="w-full rounded-[18px] border border-[#d9e5ee] bg-white p-4 outline-none transition-all focus:border-[#1b9dc4] focus:ring-4 focus:ring-[#1b9dc4]/10"
                            >
                              <option value="">
                                {locale === "ar" ? "اختر" : "Select"}
                              </option>
                              <option value="male">{t.male}</option>
                              <option value="female">{t.female}</option>
                            </select>
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-[#617183]">
                              {t.dob}
                            </label>
                            <input
                              type="date"
                              value={form.dob}
                              onChange={(e) => update("dob", e.target.value)}
                              className="w-full rounded-[18px] border border-[#d9e5ee] bg-white p-4 outline-none transition-all focus:border-[#1b9dc4] focus:ring-4 focus:ring-[#1b9dc4]/10"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#617183]">
                              <FileText className="h-4 w-4" />
                              {t.notes}
                            </label>
                            <textarea
                              value={form.notes}
                              onChange={(e) => update("notes", e.target.value)}
                              placeholder={t.notesPlaceholder}
                              className="min-h-[120px] w-full resize-none rounded-[18px] border border-[#d9e5ee] bg-white p-4 outline-none transition-all focus:border-[#1b9dc4] focus:ring-4 focus:ring-[#1b9dc4]/10"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="flex cursor-pointer items-start gap-3 rounded-[18px] border border-[#d9e5ee] bg-[#fbfdff] p-4">
                              <input
                                type="checkbox"
                                checked={form.agreePrivacy}
                                onChange={(e) =>
                                  update("agreePrivacy", e.target.checked)
                                }
                                className="mt-1 h-4 w-4 rounded border-[#b7c9d8] text-[#1b9dc4] focus:ring-[#1b9dc4]"
                              />
                              <span className="text-sm text-[#5b6d80]">
                                {t.privacyAgree}
                              </span>
                            </label>
                            {errors.agreePrivacy && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.agreePrivacy}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Summary Bar */}
                <div className="mt-10 rounded-[28px] border border-[#dbe8f1] bg-[#f8fcfe] p-5 md:p-6">
                  <div
                    className={`flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between ${
                      isRtl ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`flex items-start gap-4 ${isRtl ? "lg:flex-row-reverse" : ""}`}
                    >
                      <div className="mt-0.5 rounded-2xl bg-white p-3 shadow-sm">
                        <Clock3 className="h-5 w-5 text-[#1b9dc4]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#7a8b9d]">
                          {locale === "ar" ?
                            "الملخص الحالي"
                          : "Current summary"}
                        </p>
                        <h4 className="mt-1 text-lg font-semibold text-[#132235]">
                          {activeSpecialtyLabel}
                        </h4>
                        <p className="mt-1 text-sm text-[#617183]">
                          {form.doctor === "any" ?
                            t.anyDoctor
                          : locale === "ar" ?
                            "سيتم تعيين الطبيب بعد الإرسال."
                          : "A doctor will be assigned after submission."}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 ${isRtl ? "lg:flex-row-reverse" : ""}`}
                    >
                      {step > 1 ?
                        <button
                          onClick={prevStep}
                          className="flex h-14 items-center gap-2 rounded-full border border-[#d9e5ee] bg-white px-6 font-medium text-[#45596d] transition-all hover:bg-[#f5fafc]"
                        >
                          {isRtl ?
                            <ChevronRight className="h-5 w-5" />
                          : <ChevronLeft className="h-5 w-5" />}
                          {t.back}
                        </button>
                      : <div />}

                      {step < 4 ?
                        <button
                          onClick={nextStep}
                          className="flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-[#1b9dc4] to-[#22b8cf] px-7 font-semibold text-white shadow-[0_16px_30px_rgba(27,157,196,0.24)] transition-all hover:brightness-105"
                        >
                          {t.next}
                          {isRtl ?
                            <ChevronLeft className="h-5 w-5" />
                          : <ChevronRight className="h-5 w-5" />}
                        </button>
                      : <button
                          onClick={submit}
                          className="flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-[#1b9dc4] to-[#22b8cf] px-7 font-semibold text-white shadow-[0_16px_30px_rgba(27,157,196,0.24)] transition-all hover:brightness-105"
                        >
                          <Check className="h-5 w-5" />
                          {t.submit}
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            : <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex min-h-[700px] flex-col items-center justify-center text-center"
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-10 w-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold text-[#132235] md:text-4xl">
                  {t.successTitle}
                </h2>
                <p className="mt-3 max-w-lg text-[#617183]">{t.successDesc}</p>
                <div className="mt-8 rounded-[24px] border border-[#dbe8f1] bg-[#f8fcfe] px-6 py-5">
                  <p className="text-sm text-[#7a8b9d]">
                    {locale === "ar" ? "رقم الحجز" : "Booking reference"}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#1b9dc4]">
                    {bookingRef}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setStep(1);
                    setForm({
                      specialty: "",
                      doctor: "any",
                      date: "",
                      time: "",
                      fullName: "",
                      phone: "",
                      email: "",
                      gender: "",
                      dob: "",
                      notes: "",
                      agreePrivacy: false,
                    });
                    setErrors({});
                  }}
                  className="mt-8 rounded-full border border-[#1b9dc4] px-7 py-3 font-semibold text-[#1b9dc4] transition-all hover:bg-[#1b9dc4] hover:text-white"
                >
                  {t.newBooking}
                </button>
              </motion.div>
            }
          </main>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════════════════════════ */
function Footer({ isRTL, toggleLang, lang }) {
  const { t } = useTranslation();
  const hospitalPosition = [30.0444, 31.2357];
  const hospitalName = "Al-Amed Hospital";

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#f7fbff] via-[#eef7ff] to-[#eaf6fb] text-slate-900">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid lg:grid-cols-[1.35fr_0.9fr] gap-6 mb-14">
          {/* Map */}
          <div className="rounded-3xl border border-sky-100 bg-white/80 p-4 backdrop-blur-sm shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div
              className={`flex items-center justify-between gap-4 mb-4 ${
                isRTL ? "flex-row-reverse text-right" : ""
              }`}
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {isRTL ? "موقعنا على الخريطة" : "Find us on the map"}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  126 Nile Corniche, Cairo
                </p>
              </div>
              <div
                className={`inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{isRTL ? "دخول آمن" : "Secure access"}</span>
              </div>
            </div>

            <div
              className="overflow-hidden rounded-2xl border border-sky-100 bg-white"
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="h-[320px] sm:h-[380px] lg:h-[420px] w-full">
                <MapContainer
                  center={hospitalPosition}
                  zoom={15}
                  scrollWheelZoom="center"
                  zoomControl={false}
                  className="h-full w-full z-0"
                >
                  <ZoomControl position="bottomright" />
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Circle
                    center={hospitalPosition}
                    radius={650}
                    pathOptions={{
                      color: "#38bdf8",
                      fillColor: "#38bdf8",
                      fillOpacity: 0.12,
                      weight: 2,
                    }}
                  />
                  <Marker position={hospitalPosition}>
                    <Popup>
                      <div className="text-sm font-medium">
                        {hospitalName}
                        <br />
                        126 Nile Corniche, Cairo
                      </div>
                    </Popup>
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                      {hospitalName}
                    </Tooltip>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="grid gap-4">
            {/* Benefits */}
            <div className="rounded-3xl border border-sky-100 bg-white/80 p-6 backdrop-blur-sm shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              <h4 className="font-semibold text-sky-700 mb-5">
                {isRTL ? "مميزات المكان" : "On-site benefits"}
              </h4>
              <div className="space-y-5">
                <div
                  className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                >
                  <div className="p-2 rounded-xl bg-sky-50">
                    <Clock3 className="w-4 h-4 text-sky-500" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">
                      {isRTL ? "طوارئ 24/7" : "Emergency 24/7"}
                    </div>
                    <div className="text-sm text-slate-500">
                      {isRTL ?
                        "خدمة مستمرة على مدار اليوم"
                      : "Round-the-clock urgent care"}
                    </div>
                  </div>
                </div>
                <div
                  className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                >
                  <div className="p-2 rounded-xl bg-sky-50">
                    <MapPin className="w-4 h-4 text-sky-500" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">
                      {isRTL ? "موقع واضح" : "Clear location"}
                    </div>
                    <div className="text-sm text-slate-500">
                      {isRTL ?
                        "سهولة الوصول بالمواصلات"
                      : "Easy to reach by transport"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-3xl border border-sky-100 bg-white/80 p-6 backdrop-blur-sm shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              <h4 className="font-semibold text-sky-700 mb-5">
                {isRTL ? "تواصل سريع" : "Quick contact"}
              </h4>
              <a className="space-y-4 text-sm text-slate-600">
                href="tel:+201080761700" className=
                {`flex items-center gap-3 hover:text-sky-700 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                <Phone className="w-4 h-4 text-sky-500" />
                <span>+20 108 076 1700</span>
              </a>
              <a
                href="mailto:care@alamed-hospital.com"
                className={`flex items-center gap-3 hover:text-sky-700 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Mail className="w-4 h-4 text-sky-500" />
                <span>care@alamed-hospital.com</span>
              </a>
              <div
                className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <MapPin className="w-4 h-4 text-sky-500" />
                <span>126 Nile Corniche, Cairo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-8 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          &copy; 2026 Al-Amed Hospital. {t("footer.rights")}
        </p>
        <div
          className={`flex items-center gap-2 text-slate-500 text-sm ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <Shield className="w-4 h-4 text-sky-500" />
          <span>JCI Accredited / ISO 9001</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AI Chatbot
   ═══════════════════════════════════════════════════════════════ */
function AIChatbot({ isRTL }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: t("chatbot.greeting") },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickQuestions = t("chatbot.quickQuestions", { returnObjects: true });

  const handleSend = async (text) => {
    if (!text.trim() || isTyping) return;

    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://hospital-chat-bot-five.vercel.app/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        },
      );

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        botText += decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: botText };
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            isRTL ?
              "حدث خطأ أثناء الاتصال بالخادم."
            : "Server connection error.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#2563eb 0%, #38bdf8 100%)",
          boxShadow: "0 25px 50px rgba(37,99,235,0.28)",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.25, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl bg-sky-400"
        />
        <AnimatePresence mode="wait">
          {isOpen ?
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white relative z-10" />
            </motion.div>
          : <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6 text-white relative z-10" />
            </motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-6 z-50 w-[390px] max-w-[calc(100vw-24px)] rounded-[32px] overflow-hidden flex flex-col"
            style={{
              height: "620px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,250,255,0.85))",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 40px 120px rgba(37,99,235,0.16)",
            }}
          >
            {/* Header */}
            <div
              className="relative overflow-hidden px-5 py-5 flex items-center gap-4"
              style={{
                background: "linear-gradient(135deg,#2563eb 0%, #38bdf8 100%)",
              }}
            >
              <div
                className="absolute -top-20 -right-10 w-44 h-44 rounded-full blur-3xl"
                style={{ background: "rgba(255,255,255,0.18)" }}
              />
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="relative w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div className="relative flex-1">
                <div className="text-white font-bold text-[15px]">
                  {t("chatbot.title")}
                </div>
                <div className="flex items-center gap-2 mt-1 text-sky-100 text-xs">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-400"
                  />
                  {t("chatbot.subtitle")}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              className={`flex-1 overflow-y-auto px-4 py-5 space-y-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.role === "user" ?
                      isRTL ? "justify-start"
                      : "justify-end"
                    : isRTL ? "justify-end"
                    : "justify-start"
                  }`}
                >
                  <div
                    className="max-w-[84%] px-4 py-3 rounded-[22px] text-sm leading-7 whitespace-pre-wrap"
                    style={{
                      background:
                        msg.role === "user" ?
                          "linear-gradient(135deg,#2563eb,#38bdf8)"
                        : "rgba(239,246,255,0.95)",
                      color: msg.role === "user" ? "#fff" : "#334155",
                      border:
                        msg.role === "assistant" ?
                          "1px solid rgba(59,130,246,0.10)"
                        : "none",
                      boxShadow:
                        msg.role === "user" ?
                          "0 10px 30px rgba(37,99,235,0.16)"
                        : "none",
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div
                  className={`flex ${isRTL ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="px-4 py-3 rounded-[20px] flex items-center gap-1.5"
                    style={{
                      background: "rgba(239,246,255,0.95)",
                      border: "1px solid rgba(59,130,246,0.10)",
                    }}
                  >
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: dot * 0.12,
                        }}
                        className="w-2 h-2 rounded-full bg-sky-500"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div
              className={`px-4 pb-3 flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background: "rgba(239,246,255,0.95)",
                    color: "#2563eb",
                    border: "1px solid rgba(59,130,246,0.14)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className={`p-4 border-t flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              style={{ borderColor: "rgba(148,163,184,0.12)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chatbot.placeholder")}
                className="flex-1 px-5 py-3 rounded-2xl outline-none text-sm"
                style={{
                  background: "rgba(248,250,252,0.9)",
                  border: "1px solid rgba(148,163,184,0.18)",
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                disabled={isTyping}
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg,#2563eb,#38bdf8)",
                  boxShadow: "0 14px 35px rgba(37,99,235,0.22)",
                }}
              >
                <Send className="w-5 h-5 text-white" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WhatsApp Button
   ═══════════════════════════════════════════════════════════════ */
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/201080761700"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/30 flex items-center justify-center"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main App
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState("en");
  const isRTL = lang === "ar";

  const toggleLang = useCallback(() => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [isRTL, lang]);

  return (
    <div
      className="min-h-screen bg-white text-slate-900 overflow-x-hidden"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <Toaster
        position={isRTL ? "bottom-left" : "bottom-right"}
        toastOptions={{
          style: {
            background: "linear-gradient(135deg, #0055FF, #0088FF)",
            color: "#fff",
            borderRadius: "16px",
            padding: "16px 24px",
            boxShadow: "0 20px 40px rgba(0,85,255,0.25)",
          },
        }}
      />
      <ScrollProgress />
      <FloatingOrbs />

      <Navigation lang={lang} toggleLang={toggleLang} isRTL={isRTL} />

      <main>
        <HeroSection isRTL={isRTL} />
        <StatsSection isRTL={isRTL} />
        <SpecialtiesSection isRTL={isRTL} />
        <WhyUsSection isRTL={isRTL} />
        <DoctorsSection isRTL={isRTL} />
        <TestimonialsSection isRTL={isRTL} />
        <FAQSection isRTL={isRTL} />
        <BookingSection isRTL={isRTL} />
      </main>

      <Footer isRTL={isRTL} toggleLang={toggleLang} lang={lang} />
      <AIChatbot isRTL={isRTL} />
      <WhatsAppButton />
    </div>
  );
}
