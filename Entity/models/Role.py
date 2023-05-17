from django.db import models

class Role(models.Model):
    NameRole = models.CharField(max_length=255)