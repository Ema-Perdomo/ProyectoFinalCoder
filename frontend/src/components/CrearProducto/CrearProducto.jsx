import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



const CrearProducto = () => {

    const { pid } = useParams();
    const [item, setItem] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        status: '',
        code: '',
        thumbnail: ''
    })

    if (pid) { //Si hay una id de producto en la ruta, se selecciono la opcion de editarlo
        //use effect ejecuta ni bien carga la pagina
        //getProduct para editarlo
        useEffect(() => {
            fetch(`http://localhost:8080/api/products/${pid}`)
                .then(response => response.json()) //convierte la respuesta en json
                .then(data => setItem(data))       //setea el item  con la data que es response en json, lo pushea al array de useState
        }, [])
    }


    const updateProduct = () => {
        try {


            fetch(`http://localhost:8080/api/products/${pid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ //TODO:Aca va el objeto, no se si se manda con stringfy
                    title: document.getElementById('title').value,
                    description: document.getElementById('description').value,
                    price: document.getElementById('price').value,
                    stock: document.getElementById('stock').value,
                    thumbnail: document.getElementById('thumbnail').value, //TODO: no sube imagen desde el form
                    category: document.getElementById('category').value,
                    status: document.getElementById('status').value,
                    code: document.getElementById('code').value
                }),
            })
                .then(res => res.json())
                .then(data =>
                    console.log(data)
                )
        } catch (error) {
            console.log('Error al cargar producto', error)
        }

    }



    const submit = () => {


        //TODO envio al back un objecto con los campos, no un string por cada uno
        console.log(document.getElementById('title').value,
            document.getElementById('description').value,
            document.getElementById('price').value,
            document.getElementById('stock').value,
            document.getElementById('category').value,
            document.getElementById('status').value,
            document.getElementById('code').value,
            document.getElementById('thumbnail').value)
        // useEffect(() => {}, []) - > rompia con el fetch de abajo dentro
        fetch(`http://localhost:8080/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //TODO:Aca va el objeto, no se si se manda con stringfy
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                price: document.getElementById('price').value,
                stock: document.getElementById('stock').value,
                thumbnail: document.getElementById('thumbnail').value, //TODO: no sube imagen desde el form
                category: document.getElementById('category').value,
                status: document.getElementById('status').value,
                code: document.getElementById('code').value
            }),
        })
            .then(res => res.json())
            .then(data =>
                console.log(data)
            )
    }


    const typing = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    //TODO: Crear un formulario para editar producto
    // llamando en cada campo los parametros del producto original y que se puedan modificar, 
    //para luego enviarlo completo incluyendo modificacion/es al endpoint de la API [LISTO!!!!]

    //Formulario para crear producto
    //TODO: Que el formulario tenga los campos requeridos obligatorios para completar la operacion
    //TODO: Enviar como objeto al endpoint de la API
    return (
        <div className>
            <div className>
                <form>
                    <label className='m-5' >
                        Nombre:
                        <input id='title' type="text" name="title" value={item.title} onChange={typing} />
                    </label>
                    <label className='m-5'>
                        Descripcion:
                        <input id="description" type="text" name="description" value={item.description} onChange={typing} />
                    </label>
                    <label className='m-5'>
                        Precio:
                        <input id="price" type="text" name="price" value={item.price} onChange={typing} />
                    </label>
                    <label className='m-5'>
                        Stock:
                        <input id="stock" type="text" name="stock" value={item.stock} onChange={typing} />
                    </label>
                    <label className='m-5'>
                        Categoria:
                        <input id="category" type="text" name="category" value={item.category} onChange={typing} />
                    </label>
                    <label className='m-5'>
                        Estado:
                        <input id="status" type="text" name="status" value={item.status} onChange={typing} />
                    </label>
                    <label className='m-5'>
                        Codigo interno:
                        <input id="code" type="text" name="code" value={item.code} onChange={typing} />
                    </label>
                    <label className='m-5'>
                        URL de la imagen:
                        <input id="thumbnail" type="text" name="thumbnail" value={item.thumbnail} onChange={typing} />
                    </label>
                    {/* TODO: VA ESTE CUANDO HAGA EL UPDATEPRODUCT */}
                    <input type="button" value="Submit" onClick={pid ? updateProduct : submit} />
                    {/* <input type="button" value="Submit" onClick={submit} />*/}

                </form>
            </div>
        </div>
    )

}

export default CrearProducto;