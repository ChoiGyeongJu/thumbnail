from django.urls     import path
from thumbnail.views import ThumbList

urlpatterns = [
    path('thumb-list', ThumbList.as_view()), 
    path('upload-thumb', ThumbList.as_view()),
    path('delete-thumb/<int:id>', ThumbList.as_view()),
]