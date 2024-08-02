//MOver el update y el delete aca para que sea mas senmcillo de llamar y usar dsde itemdetail

const { pid } = useParams();
if (pid) { //Si hay una id de producto en la ruta, se selecciono la opcion de editarlo
    //use effect ejecuta ni bien carga la pagina
    //getProduct para editarlo
    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${pid}`)
            .then(response => response.json()) //convierte la respuesta en json
            .then(data => setItem(data))       //setea el item  con la data que es response en json, lo pushea al array de useState
    }, [])
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
}