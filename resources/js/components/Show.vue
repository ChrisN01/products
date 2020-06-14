<div>
	<div class="container mt-5">
		<div class="row">
			<div class="cols-lg">
				<table class="table">
					  <thead>
					    <tr v-for='usuario in usuarios'>
					      <th scope="col">#</th>
					      <th scope="col">First</th>
					      <th scope="col">Last</th>
					      <th scope="col">Handle</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr>
					      <th scope="row">{{$usuario.id}}</th>
					      <td>{{$usuario.first_name}}</td>
					      <td>{{$usuario.last_name}}</td>
					      <td>
					      img(:src='usuario.avatar')</td>
					    </tr>
					  </tbody>
					</table>
			</div>
		</div>
	</div>
</div>
<script>
export default{
	data(){
		return {
			usuarios: [],
			cantidadResultados: 5
			//el maximo de resultados que devuelve este API es de 12 por pagina
		}
	},
	methods: {
		leerAPI(){
			axios.get('https://reqres.in/api/users', {
				params: {
					'per_page': this.cantidadResultados
				}
			}).then(response => {
				this.usuarios = response.data.data
			}).catch(e => {
				console.log(e)
			})
		}
	},
	created(){
		this.leerAPI()
	}
}
</script>