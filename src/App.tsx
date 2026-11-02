
import { useEffect, useMemo, useState } from "react";
import {
  Search, ShoppingCart, Menu, X, Plus, Minus, Trash2,
  Car, ShieldCheck, Truck, Headphones, Wrench, Package,
  Heart, ChevronDown, ArrowLeft, CircleCheck, Send
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  sku: string;
  description: string;
  compatibility: string[];
  stock: number;
  icon: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1, name: "فلتر زيت المحرك", brand: "Bosch",
    category: "فلاتر", price: 350, oldPrice: 420,
    sku: "FIL-001", description: "فلتر زيت للمحافظة على كفاءة المحرك.",
    compatibility: ["تويوتا كورولا", "هيونداي إلنترا"],
    stock: 18, icon: "🛢️"
  },
  {
    id: 2, name: "تيل فرامل أمامي", brand: "Brembo",
    category: "فرامل", price: 1250,
    sku: "BRK-002", description: "تيل فرامل عالي الجودة.",
    compatibility: ["تويوتا كورولا", "كيا سيراتو"],
    stock: 12, icon: "🛞"
  },
  {
    id: 3, name: "فلتر هواء", brand: "Mann",
    category: "فلاتر", price: 280,
    sku: "FIL-003", description: "فلتر هواء لتحسين أداء المحرك.",
    compatibility: ["نيسان صني", "هيونداي إلنترا"],
    stock: 25, icon: "🌬️"
  },
  {
    id: 4, name: "بطارية سيارة 70 أمبير", brand: "Varta",
    category: "كهرباء", price: 3200,
    sku: "BAT-004", description: "بطارية سيارة للاستخدام اليومي.",
    compatibility: ["تويوتا كورولا", "كيا سيراتو"],
    stock: 8, icon: "🔋"
  },
  {
    id: 5, name: "بوجيهات إشعال", brand: "NGK",
    category: "محرك", price: 650,
    sku: "ENG-005", description: "بوجيهات لتحسين كفاءة الاشتعال.",
    compatibility: ["نيسان صني", "هيونداي إلنترا"],
    stock: 15, icon: "⚙️"
  },
  {
    id: 6, name: "مساعد أمامي", brand: "Monroe",
    category: "عفشة", price: 1850,
    sku: "SUS-006", description: "مساعد أمامي لتحسين ثبات السيارة.",
    compatibility: ["تويوتا كورولا"],
    stock: 6, icon: "🔧"
  },
  {
    id: 7, name: "فلتر تكييف", brand: "Bosch",
    category: "فلاتر", price: 320,
    sku: "FIL-007", description: "فلتر لتنقية هواء المقصورة.",
    compatibility: ["كيا سيراتو", "نيسان صني"],
    stock: 20, icon: "❄️"
  },
  {
    id: 8, name: "طقم سيور محرك", brand: "Gates",
    category: "محرك", price: 980,
    sku: "ENG-008", description: "طقم سيور للمحرك.",
    compatibility: ["هيونداي إلنترا", "تويوتا كورولا"],
    stock: 9, icon: "⚙️"
  }
];

const categories = ["الكل", "فلاتر", "فرامل", "محرك", "كهرباء", "عفشة"];

const cars = [
  "كل السيارات",
  "تويوتا كورولا",
  "هيونداي إلنترا",
  "نيسان صني",
  "كيا سيراتو"
];

const money = (value: number) =>
  new Intl.NumberFormat("ar-EG").format(value) + " ج.م";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [selectedCar, setSelectedCar] = useState("كل السيارات");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestCar, setRequestCar] = useState("");
  const [requestPhone, setRequestPhone] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("autoparts-cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("autoparts-cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.includes(search) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "الكل" || product.category === category;

      const matchesCar =
        selectedCar === "كل السيارات" ||
        product.compatibility.includes(selectedCar);

      return matchesSearch && matchesCategory && matchesCar;
    });
  }, [search, category, selectedCar]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.stock)
              }
            : item
        );
      }

      return [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === id
            ? {
                ...item,
                quantity: Math.min(
                  item.product.stock,
                  item.quantity + amount
                )
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id: number) {
    setCart((current) =>
      current.filter((item) => item.product.id !== id)
    );
  }

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "طلب قطعة غير متوفرة - AutoParts Hub",
      `القطعة: ${requestName}`,
      `السيارة: ${requestCar}`,
      `الهاتف: ${requestPhone}`,
      `تفاصيل إضافية: ${requestMessage}`
    ].join("\n");

    const whatsappUrl =
      "https://wa.me/?text=" + encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
    setRequestSent(true);
  }

  return (
    <div className="app" dir="rtl">
      <div className="top-bar">
        <span>أهلاً بك في AutoParts Hub</span>
        <span>قطع غيار سيارتك في مكان واحد</span>
      </div>

      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon"><Wrench size={25} /></span>
          <span>AutoParts <b>Hub</b></span>
        </a>

        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMobileMenu(false)}>الرئيسية</a>
          <a href="#products" onClick={() => setMobileMenu(false)}>المنتجات</a>
          <a href="#services" onClick={() => setMobileMenu(false)}>خدماتنا</a>
          <a href="#request" onClick={() => setMobileMenu(false)}>اطلب قطعة</a>
        </nav>

        <div className="nav-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={21} />
            <span>السلة</span>
            <b>{cartCount}</b>
          </button>

          <button
            className="menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="القائمة"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="hero-label">وجهتك الذكية لقطع غيار السيارات</span>
            <h1>
              كل قطع غيار سيارتك
              <br />
              <span>في مكان واحد</span>
            </h1>
            <p>
              ابحث عن القطعة المناسبة لسيارتك بسهولة،
              واكتشف المنتجات والأسعار في تجربة شراء بسيطة.
            </p>

            <div className="hero-actions">
              <a href="#products" className="primary-button">
                تسوق الآن <ArrowLeft size={18} />
              </a>
              <a href="#request" className="secondary-button">
                اطلب قطعة غير متوفرة
              </a>
            </div>

            <div className="hero-stats">
              <div><strong>سهولة</strong><span>في البحث</span></div>
              <div><strong>تنوع</strong><span>في المنتجات</span></div>
              <div><strong>سرعة</strong><span>في الطلب</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-circle">
              <div className="car-emoji">🚘</div>
              <div className="floating-part part-one">⚙️</div>
              <div className="floating-part part-two">🔋</div>
              <div className="floating-part part-three">🛞</div>
            </div>
          </div>
        </section>

        <section className="features" id="services">
          <div className="feature">
            <ShieldCheck />
            <div><b>اختيار مناسب</b><span>معلومات واضحة عن المنتجات</span></div>
          </div>
          <div className="feature">
            <Truck />
            <div><b>تجربة طلب سهلة</b><span>خطوات بسيطة للشراء</span></div>
          </div>
          <div className="feature">
            <Headphones />
            <div><b>دعم العملاء</b><span>تواصل معنا عند الحاجة</span></div>
          </div>
          <div className="feature">
            <Package />
            <div><b>طلب قطعة خاصة</b><span>اطلب القطع غير المتوفرة</span></div>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="section-kicker">اكتشف منتجاتنا</span>
              <h2>قطع الغيار</h2>
              <p>ابحث عن القطعة التي تحتاجها لسيارتك.</p>
            </div>
            <span className="results-count">
              {filteredProducts.length} منتجات
            </span>
          </div>

          <div className="search-panel">
            <div className="search-box">
              <Search size={21} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ابحث باسم القطعة أو العلامة التجارية أو SKU..."
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="مسح البحث">
                  <X size={18} />
                </button>
              )}
            </div>

            <label className="car-select">
              <Car size={20} />
              <select
                value={selectedCar}
                onChange={(event) => setSelectedCar(event.target.value)}
              >
                {cars.map((car) => <option key={car}>{car}</option>)}
              </select>
              <ChevronDown size={16} />
            </label>
          </div>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category active" : "category"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {selectedCar !== "كل السيارات" && (
            <div className="compatibility-note">
              <Car size={17} />
              المنتجات المعروضة متوافقة حسب بيانات تجريبية مع {selectedCar}.
              يجب تأكيد رقم القطعة قبل الشراء.
            </div>
          )}

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <span className="product-emoji">{product.icon}</span>
                  {product.oldPrice && <span className="discount">عرض</span>}
                  <button
                    className={favorites.includes(product.id)
                      ? "favorite active" : "favorite"}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="إضافة للمفضلة"
                  >
                    <Heart size={19} fill={
                      favorites.includes(product.id) ? "currentColor" : "none"
                    } />
                  </button>
                </div>

                <div className="product-info">
                  <div className="product-meta">
                    <span>{product.brand}</span>
                    <span>SKU: {product.sku}</span>
                  </div>

                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <div className="compatibility">
                    <Car size={15} />
                    <span>
                      {product.compatibility.slice(0, 2).join("، ")}
                    </span>
                  </div>

                  <div className="stock">
                    <span className={product.stock > 5 ? "in-stock" : "low-stock"}>
                      {product.stock > 5 ? "متوفر" : "كمية محدودة"}
                    </span>
                    <span>المخزون: {product.stock}</span>
                  </div>

                  <div className="product-footer">
                    <div className="price">
                      <strong>{money(product.price)}</strong>
                      {product.oldPrice && (
                        <del>{money(product.oldPrice)}</del>
                      )}
                    </div>
                    <button
                      className="add-button"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <Plus size={18} /> أضف للسلة
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-results">
              <Search size={38} />
              <h3>لم نعثر على منتجات</h3>
              <p>جرب تغيير كلمات البحث أو اختيار قسم آخر.</p>
              <button onClick={() => {
                setSearch("");
                setCategory("الكل");
                setSelectedCar("كل السيارات");
              }}>
                عرض كل المنتجات
              </button>
            </div>
          )}
        </section>

        <section className="request-section" id="request">
          <div className="request-icon"><Wrench size={35} /></div>
          <div className="request-content">
            <span>لم تجد ما تبحث عنه؟</span>
            <h2>اطلب قطعة غير متوفرة</h2>
            <p>أرسل تفاصيل القطعة وسيتم تجهيز رسالة بطلبك للتواصل.</p>
          </div>
          <button className="primary-button" onClick={() => {
            setRequestOpen(true);
            setRequestSent(false);
          }}>
            ابدأ طلبك <ArrowLeft size={18} />
          </button>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand">
          <span className="brand-icon"><Wrench size={23} /></span>
          <span>AutoParts <b>Hub</b></span>
        </a>
        <p>منصة لشراء واستكشاف قطع غيار السيارات.</p>
        <span>© 2026 AutoParts Hub - جميع الحقوق محفوظة</span>
      </footer>

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-heading">
              <div><ShoppingCart /><h2>سلة المشتريات</h2></div>
              <button onClick={() => setCartOpen(false)} aria-label="إغلاق">
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={55} />
                <h3>السلة فارغة</h3>
                <p>أضيفي المنتجات التي تحتاجينها.</p>
                <button onClick={() => setCartOpen(false)}>متابعة التسوق</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.product.id}>
                      <div className="cart-item-icon">{item.product.icon}</div>
                      <div className="cart-item-details">
                        <h3>{item.product.name}</h3>
                        <strong>{money(item.product.price)}</strong>
                        <div className="quantity-controls">
                          <button onClick={() => changeQuantity(item.product.id, -1)}>
                            <Minus size={15} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.product.id, 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus size={15} />
                          </button>
                          <button
                            className="remove-button"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div><span>عدد القطع</span><b>{cartCount}</b></div>
                  <div className="total-row"><span>الإجمالي</span><strong>{money(total)}</strong></div>
                  <p>لا يشمل الإجمالي تكلفة الشحن.</p>
                  <button className="checkout-button" onClick={() => {
                    alert("هذه نسخة تجريبية. سيتم إضافة إتمام الطلب والدفع في المرحلة التالية.");
                  }}>
                    متابعة إتمام الطلب <ArrowLeft size={18} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {requestOpen && (
        <div className="overlay" onClick={() => setRequestOpen(false)}>
          <div className="request-modal" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-heading">
              <div><Wrench /><h2>طلب قطعة غير متوفرة</h2></div>
              <button onClick={() => setRequestOpen(false)} aria-label="إغلاق">
                <X />
              </button>
            </div>

            {requestSent ? (
              <div className="success-message">
                <CircleCheck size={48} />
                <h3>تم تجهيز طلبك</h3>
                <p>إذا لم تفتح رسالة واتساب، يمكنك التواصل معنا مباشرة.</p>
                <button onClick={() => setRequestOpen(false)}>إغلاق</button>
              </div>
            ) : (
              <form onSubmit={submitRequest}>
                <label>اسم القطعة المطلوبة *</label>
                <input required value={requestName}
                  onChange={(event) => setRequestName(event.target.value)}
                  placeholder="مثال: طلمبة بنزين" />

                <label>نوع السيارة والموديل *</label>
                <input required value={requestCar}
                  onChange={(event) => setRequestCar(event.target.value)}
                  placeholder="مثال: تويوتا كورولا 2020" />

                <label>رقم الهاتف *</label>
                <input required type="tel" value={requestPhone}
                  onChange={(event) => setRequestPhone(event.target.value)}
                  placeholder="رقم التواصل" />

                <label>تفاصيل إضافية</label>
                <textarea value={requestMessage}
                  onChange={(event) => setRequestMessage(event.target.value)}
                  placeholder="رقم القطعة أو تفاصيل المحرك أو أي معلومات أخرى..." />

                <button className="checkout-button" type="submit">
                  إرسال الطلب عبر واتساب <Send size={17} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
