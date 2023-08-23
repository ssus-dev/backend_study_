from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Calc
from .serializers import CalcSerializer

import random

# Create your views here.
@api_view(['GET'])
def HelloAPI(request):
    return Response("Hello API!")
    
@api_view(['GET'])
def randomAPI(request , id):
    totalCalcs = Calc.objects.all() # 모델로 만든 객체 모두 가져옴
    randomCalcs = random.sample(list(totalCalcs),id) # id는 랜덤으로 나올 개수
    serializer = CalcSerializer(randomCalcs , many=True) # 다양한 내용들에 대해 내부적으로 직렬화
    return Response(serializer.data)