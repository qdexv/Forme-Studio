import React,{useEffect,useMemo,useState} from 'react';
import {Routes,Route,Link,useLocation,useNavigate,useParams,Navigate} from 'react-router-dom';
import {motion,AnimatePresence} from 'framer-motion';
import {ArrowDownRight,ArrowRight,ArrowUpRight,ArrowUp,Instagram,Search,Heart,ShoppingBag,Menu,X,Plus,Minus,SlidersHorizontal,Check,ChevronDown,Leaf,Trash2} from 'lucide-react';
import {products,money} from './data/products.js';

const usePersist=(key,initial)=>{const [v,setV]=useState(()=>{try{return JSON.parse(localStorage.getItem(key))??initial}catch{return initial}});useEffect(()=>localStorage.setItem(key,JSON.stringify(v)),[key,v]);return [v,setV]};

function Navbar({cartCount,wishCount,onCart}){
  const [open,setOpen]=useState(false),[search,setSearch]=useState(false),[q,setQ]=useState('');
  const nav=useNavigate();
  return <>
    <header className="nav">
      <Link to="/" className="wordmark">FORME<span>STUDIO</span><i>®</i></Link>
      <nav className="desktop-links">
        <Link to="/shop">Shop</Link>
        <a href="/#collections">Collections</a>
        <a href="/#journal">Our approach</a>
      </nav>
      <div className="nav-actions">
        <button aria-label="Search" onClick={()=>setSearch(!search)}><Search size={18}/></button>
        <Link aria-label="Wishlist" to="/wishlist" className="icon-count"><Heart size={18}/>{wishCount>0&&<b>{wishCount}</b>}</Link>
        <button aria-label="Shopping bag" className="bag-btn" onClick={onCart}><ShoppingBag size={18}/><span>Bag ({cartCount})</span></button>
        <button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
      </div>
    </header>
    {search&&<div className="search-panel">
      <Search size={19}/>
      <input autoFocus value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(nav('/shop?q='+encodeURIComponent(q)),setSearch(false))} placeholder="Search furniture, materials, ideas…"/>
      <button onClick={()=>{nav('/shop?q='+encodeURIComponent(q));setSearch(false)}}>Search <ArrowRight size={16}/></button>
      <button aria-label="Close search" onClick={()=>setSearch(false)}><X size={18}/></button>
    </div>}
    {open&&<div className="mobile-menu">
      <Link onClick={()=>setOpen(false)} to="/shop">Shop the collection</Link>
      <a onClick={()=>setOpen(false)} href="/#collections">Collections</a>
      <Link onClick={()=>setOpen(false)} to="/wishlist">Wishlist</Link>
    </div>}
  </>;
}

function Footer(){
  const toTop=()=>window.scrollTo({top:0,behavior:'smooth'});
  return <footer className="footer">
    <span className="footer-grain" aria-hidden="true"/>
    <div className="footer-mark"><Link to="/" className="footer-mega" aria-label="FORME STUDIO, back to top">FORME STUDIO<i>®</i></Link></div>
    <div className="footer-tagline"><p>Considered objects for everyday living.</p><span>DESIGNED TO STAY · MADE TO LIVE WITH</span></div>
    <div className="footer-cols">
      <div className="footer-col">
        <b>HEAD STUDIO</b>
        <address>FORME STUDIO<br/>14 Marlow Yard, Unit 4<br/>London E2 9DP<br/>hello@formestudio.demo<em>Demo address</em></address>
        <p className="footer-hours">Visits by appointment<br/>Mon – Fri · 10 — 18</p>
      </div>
      <div className="footer-col footer-nav">
        <Link to="/shop">Shop all</Link>
        <a href="/#collections">Collections</a>
        <a href="/#journal">Our approach</a>
        <Link to="/wishlist">Wishlist</Link>
        <a href="#contact">Contact</a>
      </div>
      <div className="footer-col">
        <b>GOOD TO KNOW</b>
        <div className="footer-legal">
          <a href="#shipping">Shipping &amp; returns</a>
          <a href="#care">Care guide</a>
          <a href="/#collections">Room guides</a>
          <a href="/#featured">New pieces</a>
        </div>
        <p className="footer-note">Demo storefront. Prices, stock and product details are illustrative and no order is placed.</p>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 FORME STUDIO. Thoughtfully made. · Privacy · Terms</span>
      <div className="footer-social">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="FORME STUDIO on Instagram"><Instagram size={16}/></a>
        <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" aria-label="FORME STUDIO on Pinterest" className="social-mono">P</a>
      </div>
      <button className="page-top" onClick={toTop}>Page top <ArrowUp size={15}/></button>
    </div>
  </footer>;
}

function ProductCard({p,onWish,wished}){
  return <article className="product-card">
    <Link to={'/product/'+p.id} className="product-photo">
      <img src={p.image} alt={p.name} loading="lazy"/>
      {p.tag&&<span className="product-tag">{p.tag}</span>}
      <button className={'wish-float '+(wished?'active':'')} aria-label={wished?'Remove from wishlist':'Add to wishlist'} onClick={e=>{e.preventDefault();onWish(p.id)}}><Heart size={17} fill={wished?'currentColor':'none'}/></button>
      <span className="quick-view">Explore piece <ArrowUpRight size={15}/></span>
    </Link>
    <div className="product-meta">
      <div>
        <Link to={'/product/'+p.id} className="product-name">{p.name}</Link>
        <span className="product-sub">{p.material} · {p.category}</span>
      </div>
      <span className="price">{money(p.price)}</span>
    </div>
  </article>;
}

function Home({onWish,wishlist}){
  const featured=products.slice(0,4);
  return <>
    <section className="hero">
      <img className="hero-image" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90" alt="Warm minimalist living room with sculptural furniture"/>
      <div className="hero-shade"/>
      <div className="hero-copy">
        <span className="eyebrow light"><span className="eyebrow-line"/>THE ART OF EVERYDAY LIVING</span>
        <h1>Objects for<br/>the way <em>you live.</em></h1>
        <p>Thoughtful furniture. Honest materials.<br/>A home that feels unmistakably yours.</p>
        <div className="hero-ctas">
          <Link to="/shop" className="button button-light">Explore the collection <ArrowUpRight size={16}/></Link>
        </div>
      </div>
      <div className="hero-index"><span>01 / 04</span><span>FORM, FUNCTION, FEELING</span></div>
      <a className="scroll-note" href="#featured"><ArrowDownRight size={17}/> SCROLL TO DISCOVER</a>
    </section>
    <section className="intro section-pad">
      <div className="eyebrow"><span className="eyebrow-line"/>LESS, BUT BETTER</div>
      <div className="intro-content">
        <h2>Good design makes<br/>space for <em>living.</em></h2>
        <div>
          <p>We believe the pieces we live with should do more than fill a room. They should earn their place, age beautifully, and make the everyday feel a little more considered.</p>
          <Link className="under-link" to="/shop">A little more about us <ArrowUpRight size={16}/></Link>
        </div>
      </div>
      <div className="intro-stats">
        <span>01 <b>Timeless by design</b></span>
        <span>02 <b>Materials with meaning</b></span>
        <span>03 <b>Made for real life</b></span>
      </div>
    </section>
    <section className="featured section-pad" id="featured">
      <div className="section-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-line"/>THE EDIT</div>
          <h2>Pieces to live <em>with.</em></h2>
        </div>
        <Link to="/shop" className="under-link">Shop all pieces <ArrowUpRight size={16}/></Link>
      </div>
      <div className="product-grid">{featured.map(p=><ProductCard key={p.id} p={p} onWish={onWish} wished={wishlist.includes(p.id)}/>)}</div>
    </section>
    <section className="manifesto" id="journal">
      <div className="manifesto-image">
        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1500&q=85" alt="Natural textures and calm contemporary interior" loading="lazy"/>
      </div>
      <div className="manifesto-copy">
        <div className="eyebrow"><span className="eyebrow-line"/>A CONSIDERED APPROACH</div>
        <h2>Made with intention.<br/>Chosen <em>for life.</em></h2>
        <p>Natural wood with its own grain. Fabrics you want to touch. Shapes that feel right from every angle. We work with the details that make a piece worth keeping.</p>
        <Link to="/shop" className="button button-dark">Discover our philosophy <ArrowUpRight size={16}/></Link>
        <span className="manifesto-number">01 — MATERIALS & MAKING</span>
      </div>
    </section>
    <section className="rooms section-pad" id="collections">
      <div className="section-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-line"/>FIND YOUR FEELING</div>
          <h2>Room to <em>be.</em></h2>
        </div>
        <p>Different spaces, one simple idea: make room for what matters.</p>
      </div>
      <div className="room-grid">
        <Link to="/shop?category=Sofas" className="room-card room-step-1">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85" alt="Living room" loading="lazy"/>
          <span>01 / LIVING</span>
          <b>Gather a little closer <ArrowUpRight/></b>
        </Link>
        <Link to="/shop?category=Beds" className="room-card room-step-2">
          <img src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1000&q=85" alt="Quiet bedroom" loading="lazy"/>
          <span>02 / BEDROOM</span>
          <b>Find your quiet <ArrowUpRight/></b>
        </Link>
        <Link to="/shop?category=Tables" className="room-card room-step-3">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85" alt="Minimal dining room" loading="lazy"/>
          <span>03 / DINING</span>
          <b>Make space for more <ArrowUpRight/></b>
        </Link>
      </div>
    </section>
    <Newsletter/>
    <Footer/>
  </>;
}

function Newsletter(){
  const [email,setEmail]=useState(''),[state,setState]=useState('');
  return <section className="newsletter">
    <div>
      <div className="eyebrow"><span className="eyebrow-line"/>A NOTE FROM FORME</div>
      <h2>A little more <em>inspiration.</em></h2>
      <p>Occasional notes on new pieces, thoughtful spaces, and the art of living well.</p>
    </div>
    <form onSubmit={e=>{e.preventDefault();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setState('Please enter a valid email address.');return}setState('Thanks for your interest. Newsletter signup is a demo and has not been sent to a server.');setEmail('')}}>
      <label htmlFor="newsletter-email">YOUR EMAIL ADDRESS</label>
      <div className="newsletter-input">
        <input id="newsletter-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/>
        <button aria-label="Submit email"><ArrowRight/></button>
      </div>
      {state&&<span className="form-note">{state}</span>}
    </form>
  </section>;
}

function Shop({onWish,wishlist}){
  const params=new URLSearchParams(useLocation().search);
  const [category,setCategory]=useState(params.get('category')||'All pieces'),
        [sort,setSort]=useState('Featured'),
        [search,setSearch]=useState(params.get('q')||''),
        [max,setMax]=useState(2600),
        [filterOpen,setFilterOpen]=useState(false);
  const filtered=useMemo(()=>products.filter(p=>(category==='All pieces'||p.category===category)&&p.price<=max&&(`${p.name} ${p.category} ${p.material} ${p.desc}`).toLowerCase().includes(search.toLowerCase())).sort((a,b)=>sort==='Price: low to high'?a.price-b.price:sort==='Price: high to low'?b.price-a.price:sort==='Name A–Z'?a.name.localeCompare(b.name):0),[category,sort,search,max]);
  return <>
    <main className="shop-page">
      <div className="shop-hero">
        <div className="eyebrow"><span className="eyebrow-line"/>THE FORME COLLECTION</div>
        <h1>Find your <em>forever piece.</em></h1>
        <p>Considered furniture for the spaces where life happens.</p>
      </div>
      <div className="shop-toolbar">
        <span>{filtered.length} considered pieces</span>
        <div className="shop-controls">
          <button className="filter-toggle" onClick={()=>setFilterOpen(!filterOpen)}><SlidersHorizontal size={16}/> Filters</button>
          <label className="sort-select">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option><option>Name A–Z</option></select><ChevronDown size={14}/></label>
        </div>
      </div>
      <div className="shop-layout">
        {filterOpen&&<aside className="filters">
          <div className="filter-head">
            <b>Refine your search</b>
            <button onClick={()=>{setCategory('All pieces');setMax(2600);setSearch('')}}>Clear all</button>
          </div>
          <label>Search<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a piece…"/></label>
          <div className="filter-group">
            <b>Category</b>
            {['All pieces','Sofas','Chairs','Tables','Beds','Storage'].map(c=><button key={c} className={category===c?'selected':''} onClick={()=>setCategory(c)}>{c}<span>{c==='All pieces'?products.length:products.filter(p=>p.category===c).length}</span></button>)}
          </div>
          <div className="filter-group">
            <b>Maximum price <strong>{money(max)}</strong></b>
            <input type="range" min="300" max="2600" step="10" value={max} onChange={e=>setMax(+e.target.value)}/>
          </div>
        </aside>}
        <div className="product-grid shop-grid">
          {filtered.map(p=><ProductCard key={p.id} p={p} onWish={onWish} wished={wishlist.includes(p.id)}/>)}
          {!filtered.length&&<div className="empty-state"><Search size={30}/><h3>No pieces found.</h3><p>Try a different search or clear your filters.</p><button className="button button-dark" onClick={()=>{setCategory('All pieces');setMax(2600);setSearch('')}}>Clear filters</button></div>}
        </div>
      </div>
    </main>
    <Newsletter/>
    <Footer/>
  </>;
}

function ProductDetail({onAdd,onWish,wishlist}){
  const {id}=useParams(),p=products.find(x=>x.id===id);
  const [activeImg,setActiveImg]=useState(p?.image);
  const [material,setMaterial]=useState(p?.materials[0]||'Natural oak');
  const [color,setColor]=useState(p?.colors[0]||'Natural');
  const [qty,setQty]=useState(1);
  const [added,setAdded]=useState(false);
  useEffect(()=>{if(p?.image)setActiveImg(p.image)},[p?.id]);
  if(!p)return <main className="not-found"><h1>Piece not found.</h1><Link to="/shop">Back to the collection</Link></main>;
  const gallery=[p.image,'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'];
  return <>
    <main className="detail-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span>{p.name}</span></div>
      <div className="detail-layout">
        <div className="detail-visual">
          <div className="detail-canvas">
            <img src={activeImg||p.image} alt={p.name} className="detail-main-img"/>
          </div>
          <div className="detail-thumbs">
            {gallery.map((src,i)=>(
              <button key={i} className={'detail-thumb-btn '+(activeImg===src?'active':'')} onClick={()=>setActiveImg(src)} aria-label={`${p.name} view ${i+1}`}>
                <img src={src} alt=""/>
              </button>
            ))}
          </div>
        </div>
        <div className="detail-info">
          <div className="eyebrow"><span className="eyebrow-line"/>{p.category.toUpperCase()} / FORME OBJECTS</div>
          <h1>{p.name}</h1>
          <div className="detail-price">{money(p.price)} <span>USD</span></div>
          <p className="detail-desc">{p.desc}</p>
          <div className="detail-rule"/>
          <div className="option-head"><b>Material</b><span>{material}</span></div>
          <div className="swatch-row">{p.materials.map(m=><button key={m} onClick={()=>setMaterial(m)} className={'material-swatch '+(material===m?'chosen':'')} title={m}><span style={{background:m.toLowerCase().includes('walnut')?'#68472f':m.toLowerCase().includes('black')?'#292b28':m.toLowerCase().includes('bouclé')?'#e5ddce':m.toLowerCase().includes('linen')?'#cfc4b0':m.toLowerCase().includes('velvet')?'#536153':'#c4a174'}}/>{m}</button>)}</div>
          <div className="option-head color-head"><b>Finish</b><span>{color}</span></div>
          <div className="color-row">{p.colors.map((c,i)=><button key={c} className={'color-swatch '+(color===c?'chosen':'')} onClick={()=>setColor(c)} title={c} style={{background:['#c6a77b','#5a3927','#292b28','#34483b','#d9d0c1','#77756d'][i%6]}}><span className="sr-only">{c}</span></button>)}</div>
          <div className="detail-rule"/>
          <div className="purchase-row">
            <div className="quantity"><button aria-label="Decrease quantity" onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={15}/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>setQty(Math.min(10,qty+1))}><Plus size={15}/></button></div>
            <button className="button button-dark add-button" onClick={()=>{onAdd(p,qty,{material,color});setAdded(true);setTimeout(()=>setAdded(false),1800)}}>{added?<><Check size={17}/> Added to bag</>:<>Add to bag · {money(p.price*qty)} <ArrowUpRight size={16}/></>}</button>
            <button className={'detail-wish '+(wishlist.includes(p.id)?'active':'')} onClick={()=>onWish(p.id)} aria-label="Toggle wishlist"><Heart fill={wishlist.includes(p.id)?'currentColor':'none'}/></button>
          </div>
          <div className="delivery-note"><Leaf size={17}/><span><b>Thoughtfully made, made to last.</b><br/>Estimated delivery: 2–4 weeks · Free delivery over $1,000</span></div>
          <details className="spec-details"><summary>Dimensions & specifications <Plus size={16}/></summary><p>{p.dimensions}. Designed for everyday use with durable materials and considered construction.</p></details>
          <details className="spec-details"><summary>Materials & care <Plus size={16}/></summary><p>Dust regularly with a soft cloth. Blot spills immediately. Keep away from direct heat and prolonged direct sunlight.</p></details>
        </div>
      </div>
    </main>
    <section className="related section-pad">
      <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/>THE PAIRING</div><h2>Good company.</h2></div><Link className="under-link" to="/shop">View all pieces <ArrowRight size={16}/></Link></div>
      <div className="product-grid">{products.filter(x=>x.id!==p.id).slice(0,4).map(x=><ProductCard key={x.id} p={x} onWish={onWish} wished={wishlist.includes(x.id)}/>)}</div>
    </section>
    <Footer/>
  </>;
}

function Wishlist({wishlist,onWish}){
  const items=products.filter(p=>wishlist.includes(p.id));
  return <>
    <main className="simple-page">
      <div className="eyebrow"><span className="eyebrow-line"/>YOUR PERSONAL EDIT</div>
      <h1>Pieces to <em>keep close.</em></h1>
      <p>Your saved pieces, all in one place.</p>
      {items.length?<div className="product-grid">{items.map(p=><ProductCard key={p.id} p={p} onWish={onWish} wished/>)}</div>:<div className="empty-state"><Heart size={32}/><h3>A little space for favourites.</h3><p>Save the pieces you love and they’ll be waiting here.</p><Link className="button button-dark" to="/shop">Explore the collection <ArrowRight size={16}/></Link></div>}
    </main>
    <Footer/>
  </>;
}

function CartDrawer({open,onClose,cart,onQty,onRemove}){
  const total=cart.reduce((s,i)=>s+i.product.price*i.qty,0);
  return <AnimatePresence>
    {open&&<>
      <motion.div className="drawer-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}/>
      <motion.aside className="cart-drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'tween',duration:.25}}>
        <div className="drawer-head">
          <div><span className="eyebrow">YOUR SELECTION</span><h2>Your bag <span>({cart.reduce((s,i)=>s+i.qty,0)})</span></h2></div>
          <button aria-label="Close bag" onClick={onClose}><X/></button>
        </div>
        {cart.length?<>
          <div className="cart-items">{cart.map(item=><div className="cart-item" key={item.key}><img src={item.product.image} alt={item.product.name}/><div className="cart-item-info"><b>{item.product.name}</b><span>{item.variant.material} · {item.variant.color}</span><strong>{money(item.product.price*item.qty)}</strong><div className="cart-qty"><button onClick={()=>onQty(item.key,item.qty-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.qty}</span><button onClick={()=>onQty(item.key,item.qty+1)} aria-label="Increase quantity"><Plus size={13}/></button><button className="remove-item" onClick={()=>onRemove(item.key)}><Trash2 size={14}/> Remove</button></div></div></div>)}</div>
          <div className="cart-summary">
            <div><span>Subtotal</span><b>{money(total)}</b></div>
            <p>Shipping and taxes calculated at checkout.</p>
            <Link to="/checkout" onClick={onClose} className="button button-dark">Continue to checkout <ArrowRight size={16}/></Link>
            <span className="demo-note">Demo storefront · no payment will be taken.</span>
          </div>
        </>:
          <div className="cart-empty">
            <ShoppingBag size={34}/>
            <h3>Your bag is taking a breather.</h3>
            <p>There’s nothing here just yet.</p>
            <button className="button button-dark" onClick={onClose}>Explore the collection <ArrowRight size={16}/></button>
          </div>
        }
      </motion.aside>
    </>}
  </AnimatePresence>;
}

function Checkout({cart}){
  const [submitted,setSubmitted]=useState(false);
  const total=cart.reduce((s,i)=>s+i.product.price*i.qty,0);
  return <>
    <main className="checkout-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Checkout</span></div>
      <div className="checkout-layout">
        <section>
          <div className="eyebrow"><span className="eyebrow-line"/>ALMOST YOURS</div>
          <h1>Make it <em>official.</em></h1>
          <p className="checkout-warning">This is a demo checkout. No payment details are requested and no order will be placed.</p>
          {submitted?<div className="empty-state"><Check size={30}/><h3>Demo form validated.</h3><p>No order was placed. Connect a secure commerce backend to enable real checkout.</p><Link to="/shop" className="button button-dark">Back to the collection</Link></div>:
          <form className="checkout-form" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}>
            <h3>01 / Delivery details</h3>
            <div className="form-two"><label>First name<input required autoComplete="given-name"/></label><label>Last name<input required autoComplete="family-name"/></label></div>
            <label>Email address<input required type="email" autoComplete="email"/></label>
            <label>Street address<input required autoComplete="street-address"/></label>
            <div className="form-two"><label>City<input required autoComplete="address-level2"/></label><label>Postal code<input required autoComplete="postal-code"/></label></div>
            <label>Country<select required defaultValue=""><option value="" disabled>Select a country</option><option>India</option><option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option></select></label>
            <button className="button button-dark" type="submit">Validate demo checkout <ArrowRight size={16}/></button>
          </form>}
        </section>
        <aside className="checkout-summary">
          <h3>Your order</h3>
          {cart.map(i=><div className="checkout-item" key={i.key}><img src={i.product.image} alt=""/><div><b>{i.product.name}</b><span>{i.variant.material} · Qty {i.qty}</span></div><strong>{money(i.product.price*i.qty)}</strong></div>)}
          {!cart.length&&<p>Your bag is empty. <Link to="/shop">Explore the collection.</Link></p>}
          <div className="summary-line"><span>Subtotal</span><b>{money(total)}</b></div>
          <div className="summary-line"><span>Shipping</span><span>Calculated later</span></div>
          <div className="summary-line total-line"><b>Total</b><b>{money(total)}</b></div>
          <span className="demo-note">Demo pricing in USD. No payment processing.</span>
        </aside>
      </div>
    </main>
    <Footer/>
  </>;
}

function App(){
  const [cart,setCart]=usePersist('forme-cart',[]),[wishlist,setWishlist]=usePersist('forme-wishlist',[]),[cartOpen,setCartOpen]=useState(false);
  const location=useLocation();
  useEffect(()=>{window.scrollTo({top:0,behavior:'instant'})},[location.pathname,location.search]);
  const add=(product,qty,variant)=>{
    const key=product.id+'|'+variant.material+'|'+variant.color;
    setCart(old=>{
      const found=old.find(i=>i.key===key);
      return found?old.map(i=>i.key===key?{...i,qty:Math.min(10,i.qty+qty)}:i):[...old,{key,product,qty,variant}];
    });
    setCartOpen(true);
  };
  const qty=(key,n)=>setCart(old=>n<1?old.filter(i=>i.key!==key):old.map(i=>i.key===key?{...i,qty:Math.min(10,n)}:i));
  const wish=id=>setWishlist(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);
  return <>
    <Navbar cartCount={cart.reduce((s,i)=>s+i.qty,0)} wishCount={wishlist.length} onCart={()=>setCartOpen(true)}/>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home onWish={wish} wishlist={wishlist}/>}/>
        <Route path="/shop" element={<Shop onWish={wish} wishlist={wishlist}/>}/>
        <Route path="/product/:id" element={<ProductDetail onAdd={add} onWish={wish} wishlist={wishlist}/>}/>
        <Route path="/showroom" element={<Navigate to="/shop" replace/>}/>
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onWish={wish}/>}/>
        <Route path="/checkout" element={<Checkout cart={cart}/>}/>
        <Route path="*" element={<main className="not-found"><span className="eyebrow">404 / LOST IN THE LAYOUT</span><h1>This space is <em>unfurnished.</em></h1><Link className="button button-dark" to="/">Back home <ArrowRight size={16}/></Link></main>}/>
      </Routes>
    </AnimatePresence>
    <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} cart={cart} onQty={qty} onRemove={key=>setCart(old=>old.filter(i=>i.key!==key))}/>
  </>;
}

export default App;
