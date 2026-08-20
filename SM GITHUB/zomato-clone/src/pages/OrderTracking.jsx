import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Package, Truck, Clock, MapPin, Phone, User, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function OrderTracking() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated } = useAuth()
  const [orders, setOrders] = useState([])
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('zomato-orders') || '[]')
    setOrders(savedOrders)

    // If there's an orderId in query params, select that order
    const orderId = searchParams.get('orderId')
    if (orderId) {
      const order = savedOrders.find((o) => o.id === orderId)
      if (order) {
        setSelectedOrder(order)
        setExpandedOrderId(order.id)
      }
    }
  }, [isAuthenticated, navigate, searchParams])

  const getOrderStatus = (status) => {
    const statusMap = {
      confirmed: { icon: Package, color: 'bg-blue-100 text-blue-600', label: 'Order Confirmed' },
      preparing: { icon: Clock, color: 'bg-yellow-100 text-yellow-600', label: 'Preparing' },
      ontheway: { icon: Truck, color: 'bg-purple-100 text-purple-600', label: 'On The Way' },
      delivered: { icon: MapPin, color: 'bg-green-100 text-green-600', label: 'Delivered' },
    }
    return statusMap[status] || statusMap.confirmed
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-zomato-gray py-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-2xl font-bold text-gray-800 mb-2">No orders yet</p>
            <p className="text-gray-600 mb-8">
              Start ordering your favorite food from our restaurants
            </p>
            <button
              onClick={() => navigate('/restaurants')}
              className="btn-primary"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zomato-gray py-12">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = getOrderStatus(order.status).icon
            const statusConfig = getOrderStatus(order.status)
            const isExpanded = expandedOrderId === order.id

            return (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <button
                  onClick={() =>
                    setExpandedOrderId(isExpanded ? null : order.id)
                  }
                  className="w-full p-6 hover:bg-gray-50 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-6 flex-grow">
                    {/* Status Icon */}
                    <div className={`p-3 rounded-full ${statusConfig.color}`}>
                      <StatusIcon size={24} />
                    </div>

                    {/* Order Info */}
                    <div className="text-left flex-grow">
                      <p className="font-bold text-gray-800">{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} items • {order.deliveryAddress}
                      </p>
                      <p className="text-sm font-semibold text-zomato-red mt-1">
                        {statusConfig.label}
                      </p>
                    </div>

                    {/* Total & Date */}
                    <div className="text-right">
                      <p className="font-bold text-gray-800">₹{order.total}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(parseInt(order.id.split('-')[1])).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="ml-4">
                    {isExpanded ? (
                      <ChevronUp className="text-gray-400" />
                    ) : (
                      <ChevronDown className="text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Order Details */}
                {isExpanded && (
                  <div className="border-t p-6 bg-gray-50 space-y-6">
                    {/* Delivery Status Timeline */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4">Delivery Status</h3>
                      <div className="space-y-3">
                        {[
                          { step: 'Order Confirmed', completed: true },
                          { step: 'Preparing', completed: order.status !== 'confirmed' },
                          { step: 'On the Way', completed: order.status === 'ontheway' || order.status === 'delivered' },
                          { step: 'Delivered', completed: order.status === 'delivered' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                item.completed
                                  ? 'bg-green-600'
                                  : 'bg-gray-300'
                              }`}
                            ></div>
                            <span
                              className={
                                item.completed
                                  ? 'text-gray-800 font-semibold'
                                  : 'text-gray-600'
                              }
                            >
                              {item.step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <MapPin size={20} className="text-zomato-red" />
                        Delivery Address
                      </h3>
                      <p className="text-gray-700 ml-7">
                        {order.deliveryAddress}, {order.city}
                      </p>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Phone size={20} className="text-zomato-red" />
                        Contact
                      </h3>
                      <p className="text-gray-700 ml-7">{order.phone}</p>
                    </div>

                    {/* Items */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3">Items</h3>
                      <div className="space-y-2 ml-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-gray-700"
                          >
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span className="font-semibold">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Subtotal</span>
                        <span>
                          ₹
                          {order.items.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Delivery Fee</span>
                        <span>₹40</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-bold">
                        <span>Total</span>
                        <span className="text-zomato-red">₹{order.total}</span>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <p className="text-sm text-gray-700">
                        <strong>Payment Method:</strong> {order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                      </p>
                    </div>

                    {/* Estimated Delivery */}
                    {order.status !== 'delivered' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => navigate('/restaurants')}
                        className="btn-secondary flex-1"
                      >
                        Order Again
                      </button>
                      {order.status === 'delivered' && (
                        <button className="btn-secondary flex-1">
                          Rate Order
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
