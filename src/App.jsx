import { useState } from 'react'
import './App.css'

function App() {
  const [items, setItem] = useState([])
  const [product, setProduct] = useState('')

  const addProduct = (e) => {
    e.preventDefault()

    if (product.trim() !== '') {
      setItem(prev => [...prev, {
        id: crypto.randomUUID(),
        productName: product.toLocaleUpperCase().trim(),
        checked: false
      }]);
    }

    setProduct('')
  }

  const createHandleRemoveItem = (id) => () => {
    setItem(prevItems => {
      return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }

  const createHandleCheckProduct = (id) => () => {
    setItem(prevItems =>
      prevItems.map(currentItem =>
        currentItem.id === id ? { ...currentItem, checked: !currentItem.checked } : currentItem
      )
    )
  }

  return (
    <>
      <section className="container">
        <h2>Lista De Compras</h2>
        <div className='addProductContainer'>
          <form>
            <input type="text" className='addProductInput' placeholder='Escribe un producto.' value={product} onChange={(e) => setProduct(e.target.value)} />
            <button className='addProductBtn' onClick={addProduct}>Agregar</button>
          </form>
        </div>

        <div className='listaContainer'>
          <ul>
            {
              items.length === 0 ? (
                <p>
                  <strong>No hay productos en la lista.</strong>
                </p>
              ) : (
                items.map((item) => (
                  <li key={item.id}>
                    <span className={item.checked ? 'crossedOut' : ''}>{item.productName}</span>
                    <div className='accionsContainer'>
                      {
                        !item.checked ? (
                          <button onClick={createHandleRemoveItem(item.id)}>Eliminar</button>
                        ) : ('')
                      }

                      <button onClick={createHandleCheckProduct(item.id)}>
                        {!item.checked ? 'Check' : 'Uncheck'}
                      </button>
                    </div>
                  </li>
                ))
              )
            }
          </ul>
        </div>
      </section>
    </>
  )
}

export default App
