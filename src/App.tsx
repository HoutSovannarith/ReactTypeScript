import './App.css'
import {useEffect, useState} from "react";
import CardComponent from "./components/CardComponent.tsx";
import SpinnerComponent from "./components/ui/SpinnerComponent.tsx";
import {Button, Modal} from 'flowbite-react';
import FormCreateProduct from "./components/FormCreateProduct.tsx";
import {data} from "autoprefixer";


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
    const [openModal, setOpenModal] = useState(false);
    const [products, setProduct] = useState<Products[]>([]);
    const [status, setStatus] = useState<Status>('idle')
    const [dataForm, setDataForm] = useState({})


    useEffect(() => {
        setStatus('loading')
        fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => {
            setProduct(data)
            setStatus('success')
        }).catch(err => {
            setStatus('error')
        })
    }, [])

    if (status === 'loading') {
        return (
            <div className="h-screen grid place-content-center">
                <SpinnerComponent/>
            </div>
        )
    }

    function getDataForm(product:any){
        setDataForm(product)
    }

    const createProduct = () => {
        fetch("https://fakestoreapi.com/products",{
            method: "POST",
            body: JSON.stringify(dataForm),
            headers:{
                "Content type": "application/json; charset=UTF-8"
            }
        }).then((res) => res.json()).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        });
        setOpenModal(false)
    }

    return (
        <>
            <div className="container mx-auto mt-4 flex justify-between">
                <h1 className="text-3xl font-bold text-cyan-700">All Products</h1>
                <Button onClick={() => setOpenModal(true)}>Create Product</Button>
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
            {/*   Modal   */}
            <Modal show={openModal} size="lg" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="">
                        <h3 className="mb-5 text-xl text-center font-normal text-gray-500 dark:text-gray-400">
                            Create Product
                        </h3>
                        <div className="mb-6 ">
                            <FormCreateProduct getDataForm = {getDataForm}/>
                        </div>

                        <div className="flex justify-center gap-8">
                            <Button onClick={() => createProduct()}>
                                Create
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default App
