<div>
	<div class="container mt-5">
		<div class="row">
			<div class="cols-lg">
				<table class="table">
					  <thead>
					    <tr>
					      <th scope="col">#</th>
					      <th scope="col">First</th>
					      <th scope="col">Last</th>
					      <th scope="col">Handle</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr>
					      <th scope="row">{{$products.name}}</th>
					      <td>{{$products.price}}</td>
					      <td>{{$products.description}}</td>
					      <td>
					      img(:src='products.image')</td>
					    </tr>
					  </tbody>
					</table>
			</div>
		</div>
	</div>
</div>
