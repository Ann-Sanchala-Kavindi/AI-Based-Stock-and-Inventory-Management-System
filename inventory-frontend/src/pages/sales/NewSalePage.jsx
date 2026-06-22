import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllProducts } from "../../api/productApi"
import { createSale } from "../../api/saleApi"
import toast from "react-hot-toast"

export default function NewSalePage({ SidebarComponent, backPath }) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [search, setSearch]     = useState("")
  const [cart, setCart]         = useState([])
  const [paymentMethod, setPaymentMethod] = useState("CASH")
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading]   = useState(true)

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      const res = await getAllProducts()
      setProducts(res.data)
    } catch (err) {
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.brand || "").toLowerCase().includes(search.toLowerCase())
  )

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(c => c.id === product.id)
      if (existing) {
        return prev.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { id: product.id, name: product.name, price: Number(product.price), qty: 1 }]
    })
  }

  function changeQty(id, delta) {
    setCart(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c)
      return updated.filter(c => c.qty > 0)
    })
  }

  function removeItem(id) {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0)

  async function handleCheckout() {
    if (cart.length === 0) return
    try {
      setSubmitting(true)
      const payload = {
        paymentMethod,
        saleItems: cart.map(c => ({ productId: c.id, quantity: c.qty })),
      }
      await createSale(payload)
      toast.success("Sale completed successfully")
      setCart([])
      navigate(backPath ? `${backPath}/sales` : "/sales")
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || "Sale failed"
      toast.error(typeof msg === "string" ? msg : "Sale failed — check stock levels")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex-1 p-5">
      <div className="grid grid-cols-[1.5fr_1fr] gap-4">

        {/* Product picker */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-800 mb-3">Select products</p>
          <div className="relative mb-3">
            <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5
                text-sm text-gray-800 outline-none focus:border-blue-400
                focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {loading ? (
            <p className="text-xs text-gray-400 text-center py-8">Loading products...</p>
          ) : filtered.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-8">No products found</p>
          ) : (
            <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto">
              {filtered.map((p) => (
                <button key={p.id} onClick={() => addToCart(p)}
                  className="flex items-center justify-between px-3 py-2.5
                    border border-gray-100 rounded-lg hover:bg-gray-50 transition-all text-left">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.brand || "—"}</p>
                  </div>
                  <span className="text-xs text-gray-500">Rs. {Number(p.price).toLocaleString()}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col">
          <p className="text-sm font-medium text-gray-800 mb-3">Cart</p>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10">
              <i className="ti ti-shopping-cart text-2xl text-gray-200 mb-2" />
              <p className="text-xs text-gray-400">Cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mb-3">
              {cart.map((c) => (
                <div key={c.id} className="flex items-center gap-2 py-2 border-b border-gray-50">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800">{c.name}</p>
                    <p className="text-[11px] text-gray-400">Rs. {c.price} each</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => changeQty(c.id, -1)}
                      className="w-5.5 h-5.5 w-6 h-6 border border-gray-200 rounded-md
                        flex items-center justify-center text-gray-500 text-xs">−</button>
                    <span className="text-xs w-4 text-center">{c.qty}</span>
                    <button onClick={() => changeQty(c.id, 1)}
                      className="w-6 h-6 border border-gray-200 rounded-md
                        flex items-center justify-center text-gray-500 text-xs">+</button>
                  </div>
                  <span className="text-xs text-gray-500 w-14 text-right">
                    Rs. {(c.price * c.qty).toLocaleString()}
                  </span>
                  <button onClick={() => removeItem(c.id)} className="text-red-400 text-sm">
                    <i className="ti ti-x" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">Payment method</p>
            <div className="flex gap-1.5 mb-3">
              {["CASH", "CARD", "ONLINE"].map(method => (
                <button key={method} onClick={() => setPaymentMethod(method)}
                  className={`flex-1 py-2 text-xs rounded-lg border transition-all
                    ${paymentMethod === method
                      ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
                      : "border-gray-200 text-gray-500"}`}>
                  {method.charAt(0) + method.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <div className="flex items-baseline justify-between mb-3">
              <span className="text-xs text-gray-500">Total</span>
              <span className="text-xl font-medium text-gray-800">
                Rs. {total.toLocaleString()}
              </span>
            </div>

            <button onClick={handleCheckout} disabled={cart.length === 0 || submitting}
              className="w-full bg-[#0B1120] text-white py-2.5 rounded-lg text-sm
                font-medium hover:opacity-80 transition-all disabled:opacity-40">
              {submitting ? "Processing..." : "Complete sale"}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}