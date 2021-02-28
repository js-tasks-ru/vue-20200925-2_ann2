<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': text === 'Загрузка...' }"
      :style="getStyle"
    >
      <span>{{ text || getText }}</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="changeImg"
        @click="reset($event)"
        :disabled="text === 'Загрузка...'"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',
  data() {
    return {
      text: '',
    };
  },
  props: {
    imageId: {
      type: Number,
      default: null,
    },
  },
  model: {
    prop: 'imageId',
    event: 'change',
  },
  computed: {
    getText() {
      return this.imageId ? 'Удалить изображение' : 'Загрузить изображение';
    },
    getStyle() {
      return this.imageId
        ? `--bg-image: url('${ImageService.getImageURL(this.imageId)}')`
        : '';
    },
  },
  methods: {
    changeImg(e) {
      if (!this.imageId) {
        this.text = 'Загрузка...';
        ImageService.uploadImage(e.target.files[0]).then((response) => {
          this.$emit('change', response.id);
          this.text = '';
        });
      }
    },
    reset($event) {
      if (this.imageId) {
        this.$emit('change', null);
        $event.target.value = '';
        $event.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
