from django.contrib import admin
from .models import Calc

# Register your models here.
admin.site.register(Calc) # 관리자 페이지에 모델을 register하여 관리가 가능하도록