import React from 'react'
import {useQuery, useMutation} from '@apollo/client'
import { QUERY_ITEMS } from '../utils/queries'
import { QUERY_ITEMS_BY_TAGS } from '../utils/queries'

const Admin = () => {
    const { loading, data } = useQuery(QUERY_ITEMS);
    const items = data?.items || [];
    console.log(items)

    return(
        <div>
            <h1>
                Add new item:  
            </h1>
            <form>
                <div className="form-group">
                    <label >Item Name</label><br/>
                    <input type="text" className="form-control" id="itemName" />
                </div>
                <div className="form-group">
                    <label>Price</label><br/>
                    <input type="text" className="form-control" id="itemPrice" />
                </div>
                <div className="form-group">
                    <label>Description</label><br/>
                    <input type="text" className="form-control" id="itemDescription" />
                </div>
                <div className="form-group">
                    <label>Tags: separate with comma</label><br/>
                    <input type="text" className="form-control" id="itemTags" />
                </div>
                <div className="form-group">
                    <label>Stock</label><br/>
                    <input type="text" className="form-control" id="itemStock" />
                </div>
                <div className="form-group">
                    <label>Brand</label><br/>
                    <input type="text" className="form-control" id="itemBrand" />
                </div>
                <div className="form-group">
                    <label>Brand</label><br/>
                    <input type="text" className="form-control" id="itemBrand" />
                </div><br/>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="bestSeller"/>
                            <label className="form-check-label" for="gridCheck1">
                                Best Seller?
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="saleItem"/>
                            <label className="form-check-label" for="gridCheck1">
                                Sale Item?
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="newArrival"/>
                            <label className="form-check-label" for="gridCheck1">
                                New Arrival?
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div>
                {loading ? (
                    <div>
                        ...loading
                    </div>
                ) : (
                    <ul>
                    {items.map((item) => 
                      
                            <li>
                                {item.name}
                            </li>
                   
                    )}
                </ul>
                )}
               
            </div>
        </div>
    )
}

export default Admin