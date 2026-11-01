import { useMemo, useState } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  Wrench,
  ShieldCheck,
  Truck,
  Headphones,
  ArrowLeft,
  CarFront,
  Settings,
  ChevronLeft,
  Package,
  Plus,
  CheckCircle2
} from 'lucide-react';

import { products } from './data/products';
import { vehicles } from './data/vehicles';

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('الكل');
  const [selectedCar, setSelectedCar] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    'الكل',
    ...Array.from(new Set(products.map((product) => product.category)))
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.nameEn.toLowerCase().includes(searchText) ||
        product.sku.toLowerCase().includes(searchText) ||
        product.oem.toLowerCase().includes(searchText);

      const matchesCategory =
        category === 'الكل' || product.category === category;

      const matchesCar =
        !selectedCar || product.compatibleCars.includes(selectedCar);

      return matchesSearch && matchesCategory && matchesCar;
    });
  }, [search, category, selectedCar]);

  const addToCart = () => {
    setCartCount((count) => count + 1);
  };

  return (
    <div className="app" dir="rtl">

      {/* Navigation */}
      <header className="navbar">
        <div className="container nav-container">

          <a href="#" className="logo">
            <span className="logo-icon">
              <Wrench size={25} />
            </span>
            <span>
              AutoParts <strong>Hub</strong>
            </span>
          </a>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="فتح القائمة"
          >
            <Menu size={25} />
          </button>

          <nav className={menuOpen ? 'nav-links active' : 'nav-links'}>
            <a href="#">الرئيسية</a>
            <a href="#products">قطع الغيار</a>
            <a href="#about">من نحن</a>
            <a href="#contact">تواصل معنا</a>
          </nav>

          <div className="nav-actions">
            <button className="cart-button">
              <ShoppingCart size={21} />
              <span>السلة</span>
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">

          <div className="hero-text">
            <span className="hero-badge">
              <CheckCircle2 size={16} />
              وجهتك الموثوقة لقطع غيار السيارات
            </span>

            <h1>
              كل قطع غيار سيارتك
              <span> في مكان واحد</span>
            </h1>

            <p>
              اكتشف مجموعة متنوعة من قطع الغيار الأصلية
              وعالية الجودة، وابحث عن القطعة المناسبة لسيارتك بسهولة.
            </p>

            <a href="#products" className="primary-button">
              اكتشف المنتجات
              <ArrowLeft size={19} />
            </a>
          </div>

          <div className="hero-visual">
            <div className="hero-icon">
              <CarFront size={115} />
            </div>
            <div className="hero-floating-card">
              <ShieldCheck size={25} />
              <span>جودة وموثوقية</span>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="container benefits-grid">

          <div className="benefit-item">
            <ShieldCheck size={30} />
            <div>
              <h3>جودة موثوقة</h3>
              <p>قطع غيار بمواصفات واضحة</p>
            </div>
          </div>

          <div className="benefit-item">
            <Truck size={30} />
            <div>
              <h3>سهولة الطلب</h3>
              <p>تصفح المنتجات بسهولة</p>
            </div>
          </div>

          <div className="benefit-item">
            <Headphones size={30} />
            <div>
              <h3>دعم العملاء</h3>
              <p>نساعدك في اختيار القطعة</p>
            </div>
          </div>

          <div className="benefit-item">
            <Settings size={30} />
            <div>
              <h3>توافق السيارات</h3>
              <p>ابحث حسب نوع سيارتك</p>
            </div>
          </div>

        </div>
      </section>

      {/* Products */}
      <section className="products-section" id="products">
        <div className="container">

          <div className="section-heading">
            <span>تسوق بسهولة</span>
            <h2>اكتشف قطع الغيار</h2>
            <p>ابحث عن القطعة المناسبة لسيارتك من مجموعتنا</p>
          </div>

          {/* Search */}
          <div className="search-box">
            <Search size={22} />
            <input
              type="text"
              placeholder="ابحث باسم القطعة أو SKU أو رقم OEM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Vehicle Filter */}
          <div className="vehicle-filter">
            <div className="vehicle-filter-title">
              <CarFront size={24} />
              <div>
                <h3>ابحث حسب سيارتك</h3>
                <p>اعرض قطع الغيار المتوافقة مع سيارتك</p>
              </div>
            </div>

            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
            >
              <option value="">كل السيارات</option>
              {vehicles.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand} {car.model} - {car.year}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? 'category active' : 'category'}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Product Count */}
          <div className="products-header">
            <h3>المنتجات المتاحة</h3>
            <span>{filteredProducts.length} منتجات</span>
          </div>

          {/* Product Cards */}
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>

                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <Package size={65} />
                  )}

                  {product.featured && (
                    <span className="product-badge">مميز</span>
                  )}
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-details">
                    <span>SKU: {product.sku}</span>
                    <span>OEM: {product.oem}</span>
                  </div>

                  <div className="product-stock">
                    {product.stock > 0
                      ? `متوفر: ${product.stock} قطعة`
                      : 'غير متوفر'}
                  </div>

                  <div className="product-footer">
                    <div className="product-price">
                      <strong>
                        {product.price.toLocaleString('en-US')} ج.م
                      </strong>

                      {product.oldPrice && (
                        <del>
                          {product.oldPrice.toLocaleString('en-US')} ج.م
                        </del>
                      )}
                    </div>

                    <button
                      className="add-cart-button"
                      onClick={addToCart}
                      disabled={product.stock <= 0}
                      aria-label="إضافة إلى السلة"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-products">
              <Search size={40} />
              <h3>لم نعثر على منتجات</h3>
              <p>جربي تغيير كلمات البحث أو اختيار تصنيف آخر.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setCategory('الكل');
                  setSelectedCar('');
                }}
              >
                عرض كل المنتجات
              </button>
            </div>
          )}

        </div>
      </section>

      {/* About */}
      <section className="about-section" id="about">
        <div className="container about-content">

          <div className="about-icon">
            <Wrench size={75} />
          </div>

          <div>
            <span>من نحن</span>
            <h2>AutoParts Hub</h2>
            <p>
              منصة متخصصة في عرض قطع غيار السيارات،
              ومساعدة العملاء في الوصول إلى المنتجات
              المناسبة لسياراتهم بسهولة.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container footer-content">

          <div>
            <h2>AutoParts Hub</h2>
            <p>كل ما تحتاجه سيارتك في مكان واحد.</p>
          </div>

          <div>
            <h3>روابط سريعة</h3>
            <a href="#">الرئيسية</a>
            <a href="#products">المنتجات</a>
            <a href="#about">من نحن</a>
          </div>

          <div>
            <h3>تواصل معنا</h3>
            <p>يسعدنا استقبال استفساراتكم</p>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 AutoParts Hub - جميع الحقوق محفوظة
        </div>
      </footer>

    </div>
  );
}

export default App;
