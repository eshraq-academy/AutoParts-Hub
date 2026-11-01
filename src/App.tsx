import { useState } from 'react';
import {
  Search, ShoppingCart, Menu, Wrench,
  ShieldCheck, Truck, Headphones, ArrowLeft,
  CarFront, Settings, ChevronLeft
} from 'lucide-react';

const categories = [
  'كل القطع',
  'المحركات',
  'الفرامل',
  'الفلاتر',
  'الكهرباء',
  'التعليق'
];

const products = [
  { id: 1, name: 'فلتر زيت عالي الجودة', code: 'OIL-2045', price: 450, category: 'الفلاتر', icon: '🛢️' },
  { id: 2, name: 'تيل فرامل أمامي', code: 'BRK-1020', price: 1250, category: 'الفرامل', icon: '⚙️' },
  { id: 3, name: 'شمعة إشعال أصلية', code: 'SPK-3010', price: 320, category: 'الكهرباء', icon: '🔩' },
  { id: 4, name: 'مساعد أمامي', code: 'SUS-4050', price: 2800, category: 'التعليق', icon: '🔧' }
];

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('كل القطع');
  const [cart, setCart] = useState(0);

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.includes(search) ||
      product.code.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === 'كل القطع' ||
      product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app" dir="rtl">
      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon"><Wrench /></span>
          <span>AutoParts<span className="orange">Hub</span></span>
        </a>

        <nav className="nav-links">
          <a href="#home">الرئيسية</a>
          <a href="#products">قطع الغيار</a>
          <a href="#services">خدماتنا</a>
          <a href="#about">من نحن</a>
        </nav>

        <div className="nav-actions">
          <button className="cart-button" onClick={() => alert(`عدد المنتجات في السلة: ${cart}`)}>
            <ShoppingCart />
            <span>السلة ({cart})</span>
          </button>
          <button className="menu-button"><Menu /></button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">وجهتك الأولى لقطع غيار السيارات</span>
            <h1>كل قطعة تحتاجها<br /> لسيارتك <span>في مكان واحد.</span></h1>
            <p>
              اكتشف مجموعة واسعة من قطع الغيار الأصلية
              والموثوقة، بجودة تستحق ثقتك.
            </p>

            <a className="primary-button" href="#products">
              اكتشف المنتجات <ArrowLeft size={18} />
            </a>

            <div className="hero-stats">
              <div><strong>+5000</strong><small>قطعة غيار</small></div>
              <div><strong>+1200</strong><small>عميل سعيد</small></div>
              <div><strong>100%</strong><small>اهتمام بالجودة</small></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-circle">
              <CarFront size={150} strokeWidth={1} />
              <span className="floating-icon"><Settings /></span>
            </div>
            <div className="visual-caption">
              <ShieldCheck />
              <span>اختيار موثوق لسيارتك</span>
            </div>
          </div>
        </section>

        <section className="benefits" id="services">
          <div><Truck /><span><b>توصيل سريع</b><small>لحد باب بيتك</small></span></div>
          <div><ShieldCheck /><span><b>جودة موثوقة</b><small>قطع مختارة بعناية</small></span></div>
          <div><Headphones /><span><b>دعم ومساعدة</b><small>نساعدك تختار الصح</small></span></div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">تسوق بسهولة</span>
              <h2>اكتشف قطع الغيار</h2>
            </div>
            <span className="products-count">{filteredProducts.length} منتجات</span>
          </div>

          <div className="search-box">
            <Search />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث باسم القطعة أو رقم OEM..."
            />
          </div>

          <div className="categories">
            {categories.map(category => (
              <button
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map(product => (
              <article className="product-card" key={product.id}>
                <div className="product-image">{product.icon}</div>
                <span className="product-code">{product.code}</span>
                <h3>{product.name}</h3>
                <div className="product-bottom">
                  <strong>{product.price.toLocaleString('en-US')} ج.م</strong>
                  <button onClick={() => setCart(cart + 1)} aria-label="أضف للسلة">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </article>
            ))}
            {filteredProducts.length === 0 && (
              <p className="empty-state">مفيش منتجات مطابقة للبحث.</p>
            )}
          </div>

          <a className="more-link" href="#products">
            عرض كل المنتجات <ChevronLeft size={18} />
          </a>
        </section>

        <section className="about-section" id="about">
          <div>
            <span className="eyebrow">AutoParts Hub</span>
            <h2>ثقتك تبدأ من اختيار القطعة الصح.</h2>
            <p>منصة متخصصة لتسهيل الوصول إلى قطع غيار السيارات ومساعدتك في اختيار ما يناسب سيارتك.</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand">
          <span className="brand-icon"><Wrench /></span>
          <span>AutoParts<span className="orange">Hub</span></span>
        </div>
        <p>© 2026 AutoParts Hub - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
