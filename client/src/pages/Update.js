import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_ITEM } from "../utils/mutations";
import '../css/add_updateItem.css'


const Update = () => {

    const [formState, setFormState] = useState({})
    const [updateItem, {error, updateData}] = useMutation(UPDATE_ITEM)
    let tagsArray = []

    let item = JSON.parse(localStorage.getItem('item'))
    
    useEffect(() => {
        setFormState({
            name: item.name,
            price: item.price.toString(),
            description: item.description,
            tags: item.tags,
            image: item.image,
            stock: item.stock.toString(),
            brand: item.brand
        })
    }, [])
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormState({
            ...formState,
            [name]: value.toString()
        })
    }
    const handleTagsChange = (event) => {
        const {name, value} = event.target
        tagsArray = value.split(',')
        let trimmedTagsArray = tagsArray.map((tag) => {
            return tag.trim()
        })

        setFormState({
            ...formState,
            [name]: trimmedTagsArray
        })
    }
    const handlePriceChange = (event) => {
        const {name, value} = event.target
        let price = parseFloat(value)
        setFormState({
            ...formState,
            [name]: value
        })
    }
    const handleStockChange = (event) => {
        const { name, value } = event.target
        let stock = parseInt(value)
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleBooleanChange = async (event) => {
        const { name, checked } = event.target
        setFormState({
            ...formState,
            [name]: checked
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const {data} = await updateItem({
                variables: {
                    uuid: item.uuid, 
                    name: formState.name,
                    price: parseFloat(formState.price),
                    description: formState.description,
                    tags: formState.tags,
                    image: formState.image,
                    stock: parseInt(formState.stock),
                    brand: formState.brand,
                    saleItem: formState.saleItem,
                    bestSeller: formState.bestSeller,
                    newArrival: formState.newArrival
                }
            })
            localStorage.setItem('item', JSON.stringify({
                uuid: item.uuid, 
                    name: formState.name,
                    price: parseFloat(formState.price),
                    description: formState.description,
                    tags: formState.tags,
                    image: formState.image,
                    stock: parseInt(formState.stock),
                    brand: formState.brand,
                    saleItem: formState.saleItem,
                    bestSeller: formState.bestSeller,
                    newArrival: formState.newArrival
            }))
            alert('Item has been updated!')
        }catch (e){
            console.error(e)
        }
    }
    

    return(
        <div className="container">
            <h1 className="admin_header">
                Update Item
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label >Item Name</label><br/>
                    <input type="text" className="form-control" name="name" id="itemName" onChange={handleChange} value={formState.name} />
                </div>
                <div className="form-group">
                    <label>Price</label><br/>
                    <input type="text" className="form-control" id="itemPrice" name='price'onChange={handlePriceChange} value={formState.price}/>
                </div>
                <div className="form-group">
                    <label>Description</label><br/>
                    <input type="text" className="form-control" id="itemDescription" name='description'onChange={handleChange} value={formState.description}/>
                </div>
                <div className="form-group">
                    <label>Tags: separate with comma, no spaces. example: "tag1,tag2,tag3"</label><br/>
                    <input type="text" className="form-control" id="itemTags" name='tags' onChange={handleTagsChange}value={formState.tags}/>
                </div>
                <div className="form-group">
                    <label>Stock</label><br/>
                    <input type="text" className="form-control" id="itemStock" name='stock' onChange={handleStockChange} value={formState.stock}/>
                </div>
                <div className="form-group">
                    <label>Brand</label><br/>
                    <input type="text" className="form-control" id="itemBrand" name='brand' onChange={handleChange} value={formState.brand}/>
                </div>
                <div className="form-group">
                    <label>Image URL</label><br/>
                    <input type="text" className="form-control" id="itemBrand" name='image' onChange={handleChange} value={formState.image}/>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="bestSeller" name='bestSeller' onChange={handleBooleanChange} defaultChecked={item.bestSeller}/>
                            <label className="form-check-label" for="gridCheck1">
                                Best Seller?
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="saleItem" name='saleItem' onChange={handleBooleanChange} defaultChecked={item.saleItem}/>
                            <label className="form-check-label" for="gridCheck1">
                                Sale Item?
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="newArrival" name='newArrival' onChange={handleBooleanChange} defaultChecked={item.newArrival}/>
                            <label className="form-check-label" for="gridCheck1">
                                New Arrival?
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                { error && (
                <div
                style={{color:'red'}}
                className="text-center">
                {'something went wrong. Check to make sure all the data you entered is of the correct type'}
                </div>               
                )}
                <div
                style={{color:'green'}}
                className="text-center" id='success'>
                
                </div> 
            </form>
        </div>
    )
}

export default Update