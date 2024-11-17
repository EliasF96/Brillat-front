import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AiOutlineClose } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"

export const ProductForm = ({ fetchData }) => {

  const [formCampsRegex, setFormCampsRegex] = useState([{
    nameRegex: /^[A-Z][a-z]{0,9}$/,
    markRegex: /^[A-Za-z][a-z]{1,5}$/,
    descShortRegex: /^[A-Z][a-z\\s]{0,14}$/,
    descLargeRegex: /^[A-Z][a-z\\s]{0,24}$/,
    deliveryRegex: /^[A-Za-z]{1,5}/
  }])
  const [validated, setValidated] = useState(false);

  const [formCampValidation, setformCampValidation] = useState([{
    name: false, price: false, stock: false, mark: false, category: false, descShort: false, descLarge: false, freeDelivery: false, ageSince: false, ageUntil: false, image: false
  }])
  const [productFormValues, setProductFormValues] = useState({
    name: null, price: null, stock: null, mark: null, category: null, descShort: null, descLarge: null, freeDelivery: null, ageSince: null, ageUntil: null, image: null
  })


  const handlerUpdateFormValue = (value, reference) => {
    if (reference == "name") {
      setProductFormValues({ name: value, price: productFormValues.price, stock: productFormValues.stock, mark: productFormValues.mark, category: productFormValues.category, descShort: productFormValues.descShort, descLarge: productFormValues.descLarge, freeDelivery: productFormValues.freeDelivery, ageSince: productFormValues.ageSince, ageUntil: productFormValues.ageUntil, image: productFormValues.image })
      setformCampValidation({
        name: (formCampsRegex[0].nameRegex.test(productFormValues.name)),
        price: formCampValidation.price,
        stock: formCampValidation.stock,
        mark: formCampValidation.mark,
        category: formCampValidation.category,
        descShort: formCampValidation.descShort,
        descLarge: formCampValidation.descLarge,
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: formCampValidation.ageSince,
        ageUntil: formCampValidation.ageUntil,
        image: formCampValidation.image
      })
    } else if (reference == "price") {
      setProductFormValues({ name: productFormValues.name, price: value, stock: productFormValues.stock, mark: productFormValues.mark, category: productFormValues.category, descShort: productFormValues.descShort, descLarge: productFormValues.descLarge, freeDelivery: productFormValues.freeDelivery, ageSince: productFormValues.ageSince, ageUntil: productFormValues.ageUntil, image: productFormValues.image })
      setformCampValidation({
        name: formCampValidation.name,
        price: Number(productFormValues.price) > 0,
        stock: formCampValidation.stock,
        mark: formCampValidation.mark,
        category: formCampValidation.category,
        descShort: formCampValidation.descShort,
        descLarge: formCampValidation.descLarge,
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: formCampValidation.ageSince,
        ageUntil: formCampValidation.ageUntil,
        image: formCampValidation.image
      })
    } else if (reference == "stock") {
      setProductFormValues({ name: productFormValues.name, price: productFormValues.price, stock: value, mark: productFormValues.mark, category: productFormValues.category, descShort: productFormValues.descShort, descLarge: productFormValues.descLarge, freeDelivery: productFormValues.freeDelivery, ageSince: productFormValues.ageSince, ageUntil: productFormValues.ageUntil, image: productFormValues.image })
      setformCampValidation({
        name: formCampValidation.name,
        price: formCampValidation.price,
        stock: Number(productFormValues.stock) > 0,
        mark: formCampValidation.mark,
        category: formCampValidation.category,
        descShort: formCampValidation.descShort,
        descLarge: formCampValidation.descLarge,
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: formCampValidation.ageSince,
        ageUntil: formCampValidation.ageUntil,
        image: formCampValidation.image
      })
    } else if (reference == "mark") {
      setProductFormValues({ name: productFormValues.name, price: productFormValues.price, stock: productFormValues.stock, mark: value, category: productFormValues.category, descShort: productFormValues.descShort, descLarge: productFormValues.descLarge, freeDelivery: productFormValues.freeDelivery, ageSince: productFormValues.ageSince, ageUntil: productFormValues.ageUntil, image: productFormValues.image })
      setformCampValidation({
        name: formCampValidation.name,
        price: formCampValidation.price,
        stock: formCampValidation.stock,
        mark: formCampsRegex[0].markRegex.test(productFormValues.mark),
        category: formCampValidation.category,
        descShort: formCampValidation.descShort,
        descLarge: formCampValidation.descLarge,
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: formCampValidation.ageSince,
        ageUntil: formCampValidation.ageUntil,
        image: formCampValidation.image
      })
    } else if (reference == "category") {
      setProductFormValues({ name: productFormValues.name, price: productFormValues.price, stock: productFormValues.stock, mark: productFormValues.mark, category: value, descShort: productFormValues.descShort, descLarge: productFormValues.descLarge, freeDelivery: productFormValues.freeDelivery, ageSince: productFormValues.ageSince, ageUntil: productFormValues.ageUntil, image: productFormValues.image })
      setformCampValidation({
        name: formCampValidation.name,
        price: formCampValidation.price,
        stock: formCampValidation.stock,
        mark: formCampValidation.mark,
        category: formCampsRegex[0].markRegex.test(productFormValues.category),
        descShort: formCampValidation.descShort,
        descLarge: formCampValidation.descLarge,
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: formCampValidation.ageSince,
        ageUntil: formCampValidation.ageUntil,
        image: formCampValidation.image
      })
    } else if (reference == "descShort") {
      setProductFormValues({ name: productFormValues.name, price: productFormValues.price, stock: productFormValues.stock, mark: productFormValues.mark, category: productFormValues.category, descShort: value, descLarge: productFormValues.descLarge, freeDelivery: productFormValues.freeDelivery, ageSince: productFormValues.ageSince, ageUntil: productFormValues.ageUntil, image: productFormValues.image })
      setformCampValidation({
        name: formCampValidation.name,
        price: formCampValidation.price,
        stock: formCampValidation.stock,
        mark: formCampValidation.mark,
        category: formCampValidation.category,
        descShort: formCampsRegex[0].descShortRegex.test(productFormValues.descShort),
        descLarge: formCampValidation.descLarge,
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: formCampValidation.ageSince,
        ageUntil: formCampValidation.ageUntil,
        image: formCampValidation.image
      })
    } else if (reference == "descLarge") {
      setProductFormValues({ name: productFormValues.name, price: productFormValues.price, stock: productFormValues.stock, mark: productFormValues.mark, category: productFormValues.category, descShort: productFormValues.descShort, descLarge: value, freeDelivery: productFormValues.freeDelivery, ageSince: productFormValues.ageSince, ageUntil: productFormValues.ageUntil, image: productFormValues.image })
      setformCampValidation({
        name: formCampValidation.name,
        price: formCampValidation.price,
        stock: formCampValidation.stock,
        mark: formCampValidation.mark,
        category: formCampValidation.category,
        descShort: formCampValidation.descShort,
        descLarge: formCampsRegex[0].descLargeRegex.test(productFormValues.descLarge),
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: formCampValidation.ageSince,
        ageUntil: formCampValidation.ageUntil,
        image: formCampValidation.image
      })
    } else if (reference == "freeDelivery") {
      setProductFormValues({ name: productFormValues.name, price: productFormValues.price, stock: productFormValues.stock, mark: productFormValues.mark, category: productFormValues.category, descShort: productFormValues.descShort, descLarge: productFormValues.descLarge, freeDelivery: value, ageSince: productFormValues.ageSince, ageUntil: productFormValues.ageUntil, image: productFormValues.image })
      setformCampValidation({
        name: formCampValidation.name,
        price: formCampValidation.price,
        stock: formCampValidation.stock,
        mark: formCampValidation.mark,
        category: formCampValidation.category,
        descShort: formCampValidation.descShort,
        descLarge: formCampValidation.descLarge,
        freeDelivery: productFormValues.freeDelivery == "yes" || productFormValues.freeDelivery == "no",
        ageSince: formCampValidation.ageSince,
        ageUntil: formCampValidation.ageUntil,
        image: formCampValidation.image
      })
    } else if (reference == "ageSince") {
      setProductFormValues({ name: productFormValues.name, price: productFormValues.price, stock: productFormValues.stock, mark: productFormValues.mark, category: productFormValues.category, descShort: productFormValues.descShort, descLarge: productFormValues.descLarge, freeDelivery: productFormValues.freeDelivery, ageSince: value, ageUntil: productFormValues.ageUntil, image: productFormValues.image })
      setformCampValidation({
        name: formCampValidation.name,
        price: formCampValidation.price,
        stock: formCampValidation.stock,
        mark: formCampValidation.mark,
        category: formCampValidation.category,
        descShort: formCampValidation.descShort,
        descLarge: formCampValidation.descLarge,
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: productFormValues.ageSince != "",
        ageUntil: formCampValidation.ageUntil,
        image: formCampValidation.image
      })
    } else if (reference == "ageUntil") {
      setProductFormValues({ name: productFormValues.name, price: productFormValues.price, stock: productFormValues.stock, mark: productFormValues.mark, category: productFormValues.category, descShort: productFormValues.descShort, descLarge: productFormValues.descLarge, freeDelivery: productFormValues.freeDelivery, ageSince: productFormValues.ageSince, ageUntil: value, image: productFormValues.image })
      setformCampValidation({
        name: formCampValidation.name,
        price: formCampValidation.price,
        stock: formCampValidation.stock,
        mark: formCampValidation.mark,
        category: formCampValidation.category,
        descShort: formCampValidation.descShort,
        descLarge: formCampValidation.descLarge,
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: formCampValidation.ageSince,
        ageUntil: productFormValues.ageUntil != "",
        image: formCampValidation.image
      })
    } else if (reference == "image") {
      setProductFormValues({ name: productFormValues.name, price: productFormValues.price, stock: productFormValues.stock, mark: productFormValues.mark, category: productFormValues.category, descShort: productFormValues.descShort, descLarge: productFormValues.descLarge, freeDelivery: productFormValues.freeDelivery, ageSince: productFormValues.ageSince, ageUntil: productFormValues.ageUntil, image: value })
      setformCampValidation({
        name: formCampValidation.name,
        price: formCampValidation.price,
        stock: formCampValidation.stock,
        mark: formCampValidation.mark,
        category: formCampValidation.category,
        descShort: formCampValidation.descShort,
        descLarge: formCampValidation.descLarge,
        freeDelivery: formCampValidation.freeDelivery,
        ageSince: formCampValidation.ageSince,
        ageUntil: formCampValidation.ageUntil,
        image: productFormValues.image != ""
      })
    }
    console.log(formCampValidation)
  }

  const [activate, setActivate] = useState(Boolean) 

  const post = async (event) => {

    event.preventDefault();
    let answer = window.confirm("Are you sure want to add this product?");
    if (answer) {

      try {
        fetch(`${import.meta.env.VITE_API_KEY}/products`, {
          method: "POST",
          body: JSON.stringify({ ...productFormValues }),
          headers: {
            "Content-type": "application/json; charsset=UTF-8",
          },
        })
          .then(response => {
            return response.json()
              .then(msg => {
                return toast.success(msg.message)
              })
          })
          .catch(error => console.log(error))
          
        await fetchData()
      } catch (error) {
        console.log(error)
      }

    } else {
      alert("Action Denied!")
    }
  }



  return (
    <div className='formBody'>
      <button className='openFormBtn' onClick={() => setActivate(!activate)}>ADD PRODUCT</button>
      <div className={activate ? "formWindow open" : "formWindow"}>
        <div className='formWindowMenu'>
          <h3>COMPLETE THE FORM TO ADD</h3>
          <AiOutlineClose onClick={() => setActivate(false)} className='closeIcon'></AiOutlineClose>
        </div>

        <Form noValidate validated={validated} onSubmit={post}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="ProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control required
                type="text"
                placeholder="Product Name"
                onChange={e => handlerUpdateFormValue(e.target.value, "name")}
                isInvalid={!formCampValidation.name}
                isValid={formCampValidation.name}
              />
              <Form.Control.Feedback type="invalid">
                Required! Must contain only words and start with a Capital case. Max 10
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="Price">
              <Form.Label>Price $</Form.Label>
              <Form.Control required
                type="number"
                placeholder="Set an price"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "price")}
                isInvalid={!formCampValidation.price}
                isValid={formCampValidation.price} />
              <Form.Control.Feedback type="invalid">
                Required! Must be positive numbers
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="Stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control required
                type="number"
                placeholder="Stock"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "stock")}
                isInvalid={!formCampValidation.stock}
                isValid={formCampValidation.stock} />
              <Form.Control.Feedback type="invalid">
                Required! Must be positive numbers
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="ProductMark">
              <Form.Label>Mark</Form.Label>
              <Form.Control required
                type="text"
                placeholder="Product Mark"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "mark")}
                isInvalid={!formCampValidation.mark}
                isValid={formCampValidation.mark} />
              <Form.Control.Feedback type="invalid">
                Required! Must contain only words and start with a Capital case. Max 6 characters
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="Category">
              <Form.Label>Category</Form.Label>
              <Form.Control required
                type="text"
                placeholder="Category"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "category")}
                isInvalid={!formCampValidation.category}
                isValid={formCampValidation.category} />
              <Form.Control.Feedback type="invalid">
                Required! Must contain only words and start with a Capital case. Max 6 characters
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="ShortDescription">
              <Form.Label>Short Description</Form.Label>
              <Form.Control required
                type="text"
                placeholder="Set short description"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "descShort")}
                isInvalid={!formCampValidation.descShort}
                isValid={formCampValidation.descShort} />
              <Form.Control.Feedback type="invalid">
                Required! Must contain only words and start with a Capital case. Can have white spaces. Max 15 characters
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="LargeDescription">
              <Form.Label>Large Description</Form.Label>
              <Form.Control required
                type="text"
                placeholder="set large description"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "descLarge")}
                isInvalid={!formCampValidation.descLarge}
                isValid={formCampValidation.descLarge} />
              <Form.Control.Feedback type="invalid">
                Required! Must contain only words and start with a Capital case. Can have white spaces. Max 25 characters
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="Delivery">
              <Form.Label>Free Delivery</Form.Label>
              <Form.Control required
                type="text"
                placeholder="yes|no"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "freeDelivery")}
                isInvalid={!formCampValidation.freeDelivery}
                isValid={formCampValidation.freeDelivery} />
              <Form.Control.Feedback type="invalid">
                Required! Only "yes" or "no"
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="AgeSince">
              <Form.Label>Age since</Form.Label>
              <Form.Control required
                type="date"
                placeholder="Age since"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "ageSince")}
                isInvalid={!formCampValidation.ageSince}
                isValid={formCampValidation.ageSince} />
              <Form.Control.Feedback type="invalid">
                Required!
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="AgeUntil">
              <Form.Label>Age Until</Form.Label>
              <Form.Control required
                type="date"
                placeholder="Age Until"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "ageUntil")}
                isInvalid={!formCampValidation.ageUntil}
                isValid={formCampValidation.ageUntil} />
              <Form.Control.Feedback type="invalid">
                Required!
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="ImageUrl">
              <Form.Label>Image</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Set a Image URL"
                onChange={(e) => handlerUpdateFormValue(e.target.value, "image")}
                isInvalid={!formCampValidation.image}
                isValid={formCampValidation.image} />
              <Form.Control.Feedback type="invalid">
                Required! Set a valid URL image.
              </Form.Control.Feedback>
              <Form.Control.Feedback>
                Valid!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
          <ToastContainer />
        </Form>
      </div>
    </div>
  )
}