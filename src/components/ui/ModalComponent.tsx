import {Button, Label, Modal, Textarea, TextInput} from 'flowbite-react';
import {useEffect, useState} from 'react';

type ErrorType = {
    title: string;
    price: string;
}

export default function ModalComponent({getDataForm}:any) {
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("electronic");
    const [image, setImage] = useState("https://cloudfront-us-east-2.images.arcpublishing.com/reuters/PUJUDW2HKBMYTH5M6NR35R3VDY.jpg");
    const [error, setError] = useState<ErrorType>({
        title: "",
        price: "",
    })

    //Validation
    useEffect(() => {
        if (title.length < 3) {
            setError((prev) => {
                return {
                    ...prev,
                    title: "Title must be at least 3 characters"
                }
            })
        } else {
            setError((prev) => {
                return {
                    ...prev,
                    title: "",
                }
            })
        }

        if (price < 0) {
            setError((prev) => {
                return {
                    ...prev,
                    price: "Price must be greater than 0"
                }
            })
        } else {
            setError((prev) => {
                return {
                    ...prev,
                    price: "",
                }
            })
        }
    }, [title, price])

    useEffect(() => {
        getDataForm({
            title, price, description, category, image
        })
    }, [title, price, description, category, image]);

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Create Products</Button>
            <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                <Modal.Header/>
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Products</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Product Title"/>
                            </div>
                            <TextInput
                                id="title"
                                placeholder="Apple Vision Pro"
                                type="text"
                                onChange={(event) => setTitle(event.target.value)}
                                required
                            />
                            {error.title && <p className="text-red-500">{error.title}</p>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Price"/>
                            </div>
                            <TextInput
                                id="price"
                                placeholder="$599"
                                type="number"
                                onChange={(event) => setPrice(parseFloat(event.target.value))}
                                required/>
                            {error.price && <p className="text-red-500">{error.price}</p>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Description"/>
                            </div>
                            <Textarea id="description" onChange={(event) => setDescription(event.target.value)}/>
                        </div>
                        <div className="w-full flex gap-3">
                            <Button>Create</Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
