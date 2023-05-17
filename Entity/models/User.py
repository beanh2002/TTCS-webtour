from django.db import models

class User(models.Model):
    idUser = models.BigAutoField(primary_key=True)
    UserName = models.CharField(max_length=255)
    UserEmail = models.CharField(max_length=255, null=True)
    UserPassword = models.CharField(max_length=255)
    UserDob = models.CharField(max_length=255, null=True)