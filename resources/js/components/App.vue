<template>
<div>
<nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav ml-auto">
      <a class="nav-item nav-link active float-right text-white" href="/products">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link float-right text-white">Registro de Productos</a>
      <a class="nav-item nav-link float-right text-white" to="/show">Consultar Productos</a>
    </div>
  </div>
</nav>

<div class="container mt-5">
        <div class="row justify-content-center">

            <div class="col-md-8">

                <div class="card">

                    <div class="card-header">Registro de Productos</div> 

                    <div class="card-body">
                       <div class="uploader"
                            @dragenter="OnDragEnter"
                            @dragleave="OnDragLeave"
                            @dragover.prevent
                            @drop="onDrop"
                            :class="{ dragging: isDragging }">
                            
                            <div class="upload-control" v-show="images.length">
                                <label for="file">Seleccionar imagen</label>
                                <button @click="upload">Subir</button>
                            </div>


                            <div v-show="!images.length">
                                <i class="fa fa-cloud-upload"></i>
                                <p>Arrastrar imágenes aquí</p>
                                <div>O</div>
                                <div class="file-input">
                                    <label for="file">Seleccionar imágenes</label>
                                    <input type="file" id="file" @change="onInputChange" multiple> //Se llama a la funcion para cambio de entrada
                                </div>
                            </div>

                            <div class="images-preview" v-show="images.length">
                                <div class="img-wrapper" v-for="(image, index) in images" :key="index">
                                    <img :src="image" :alt="`Cargador de imágenes ${index}`">
                                    <div class="details">
                                        <span class="name" v-text="files[index].name"></span>
                                        <span class="size" v-text="getFileSize(files[index].size)"></span>
                                    </div>
                                </div>
                            </div>

                                <br>
                                <div>
                                <strong>Nombre:</strong>
                                <input type="text" class="form-control" v-model="name">
                                <strong>Precio:</strong>
                                <br>
                                <input type="text" class="form-control" v-model="price">
                                <strong>Descripción:</strong>
                                <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>


                                </div>
                            
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
</div>
</template>

<script>
export default {
    data: () => ({
        isDragging: false,
        dragCount: 0,
        name: '',
        price: '',
        description: '',
        files: [],
        images: [],
        message: ''
    }),
    methods: {
        OnDragEnter(e) {
            e.preventDefault();
            
            this.dragCount++;
            this.isDragging = true;
            return false;
        },
        OnDragLeave(e) {
            e.preventDefault();
            this.dragCount--;
            if (this.dragCount <= 0)
                this.isDragging = false;
        },
        onInputChange(e) {
            const files = e.target.files;
            Array.from(files).forEach(file => this.addImage(file));
        },
        onDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            this.isDragging = false;
            const files = e.dataTransfer.files;
            Array.from(files).forEach(file => this.addImage(file));
        },
        addImage(file) {
            if (!file.type.match('image.*')) {
                this.$toastr.e(`${file.name} no es una imagen`);
                return;
            }
            this.files.push(file);
            const img = new Image(),
                reader = new FileReader();
            reader.onload = (e) => this.images.push(e.target.result);
            reader.readAsDataURL(file);
        },
        getFileSize(size) {
            const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
            let i = 0;
            
            while(size > 900) {
                size /= 1024;
                i++;
            }
            return `${(Math.round(size * 100) / 100)} ${fSExt[i]}`;
        },
        upload() {
            const formData = new FormData();
            
            this.files.forEach(file => {
                formData.append('images[]', file, file.name);
                formData.append('name', this.name);
                formData.append('price', this.price);
                formData.append('description', this.description);
            });
            axios.post('/images-upload', formData)
                .then( response => {
                    console.log(response)
                    let currentObj = this;
                    currentObj.message = response.data.message;
                    this.$toastr.s('Todas las imágenes han sido subidas con éxito');
                    this.images = [];
                    this.files = [];
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.uploader {
    width: 100%;
    background: #2196F3;
    color: #fff;
    padding: 40px 15px;
    text-align: center;
    border-radius: 10px;
    border: 3px dashed #fff;
    font-size: 20px;
    position: relative;
    &.dragging {
        background: #fff;
        color: #2196F3;
        border: 3px dashed #2196F3;
        .file-input label {
            background: #2196F3;
            color: #fff;
        }
    }
    i {
        font-size: 85px;
    }
    .file-input {
        width: 200px;
        margin: auto;
        height: 68px;
        position: relative;
        label,
        input {
            background: #fff;
            color: #2196F3;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            padding: 10px;
            border-radius: 4px;
            margin-top: 7px;
            cursor: pointer;
        }
        input {
            opacity: 0;
            z-index: -2;
        }
    }
    .images-preview {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        .img-wrapper {
            width: 160px;
            display: flex;
            flex-direction: column;
            margin: 10px;
            height: 150px;
            justify-content: space-between;
            background: #fff;
            box-shadow: 5px 5px 20px #3e3737;
            img {
                max-height: 105px;
            }
        }
        .details {
            font-size: 12px;
            background: #fff;
            color: #000;
            display: flex;
            flex-direction: column;
            align-items: self-start;
            padding: 3px 6px;
            .name {
                overflow: hidden;
                height: 18px;
            }
        }
    }
    .upload-control {
        position: absolute;
        width: 100%;
        background: #fff;
        top: 0;
        left: 0;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        padding: 10px;
        padding-bottom: 4px;
        text-align: right;
        button, label {
            background: #2196F3;
            border: 2px solid #03A9F4;
            border-radius: 3px;
            color: #fff;
            font-size: 15px;
            cursor: pointer;
        }
        label {
            padding: 2px 5px;
            margin-right: 10px;
        }
    }
}

@import '~vue-toastr/src/vue-toastr.scss';

</style>