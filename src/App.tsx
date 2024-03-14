import './App.css'
import {useEffect, useState} from "react";
import CardComponent from "./components/CardComponent.tsx";
import SpinnerComponent from "./components/ui/SpinnerComponent.tsx";
import ModalComponent from "./components/ui/ModalComponent.tsx";


type Status = 'idle' | 'loading' | 'success' | 'error'
type Products = {
    readonly id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string
}

function App() {
    // const [count, setCount] = useState(0);
    const [products, setProduct] = useState<Products[]>([]);
    const [status, setStatus] = useState<Status>('idle')


    useEffect(() => {
        setStatus('loading')
        fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => {
            setProduct(data)
            setStatus('success')
        }).catch(err => {
            setStatus('error')
        })
    }, [])

    if (status === 'loading'){
        return (
            <div className="h-screen grid place-content-center">
                <SpinnerComponent/>
            </div>
        )
    }

    return (
        <>
            <div className="container mx-auto flex justify-end pt-4">
                <ModalComponent/>
            </div>
            <div className="container mx-auto grid grid-cols-4 grid-flow-row gap-6 my-4">
                {products.map((product) => (
                    <CardComponent
                        key={product.id}
                        title={product.title}
                        image={product.image}
                        price={product.price}/>
                ))}
            </div>
        </>
    )
}

export default App
