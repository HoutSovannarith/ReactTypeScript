import {Label, Textarea, TextInput} from 'flowbite-react';
import {useEffect, useState} from "react";

type ErrorType = {
    title: string;
    price: string;
}


export default function FormCreateProduct({getDataForm}:any) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("electronic");
    const [image, setImage] = useState("https://cloudfront-us-east-2.images.arcpublishing.com/reuters/PUJUDW2HKBMYTH5M6NR35R3VDY.jpg");
    const [error, setError] = useState<ErrorType>({
        title: "",
        price: "",
    });

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

    return (
        <form className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="title" value="Product Title"/>
                </div>
                <TextInput
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Apple Vision Pro"
                    required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="price" value="Product Price"/>
                </div>
                <TextInput
                    id="price"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    type="number"
                    required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Product description"/>
                </div>
                <Textarea
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

            </div>
        </form>
    );
}
