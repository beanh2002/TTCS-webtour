from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
class Home(View):
    def get(self, request):
        return render(request, 'index.html')
from core.settings import MEDIA_ROOT
import os

def image_view(request, image_name):
    print("ahihi")
    # Lấy đường dẫn tới thư mục chứa các tệp hình ảnh
    image_dir = MEDIA_ROOT
    
    # Tạo đường dẫn tới tệp hình ảnh cần trả về
    image_path = os.path.join(image_dir, image_name)
    # Đọc nội dung của tệp hình ảnh
    with open(image_path, 'rb') as f:
        image_data = f.read()
    
    # Trả về nội dung của hình ảnh dưới dạng phản hồi HTTP
    response = HttpResponse(content_type='image/png')
    response.write(image_data)
    
    return response