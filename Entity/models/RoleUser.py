from django.db import models
from .Role import Role
from .User import User
class RoleUser(models.Model):
    User =models.ForeignKey(User,on_delete=models.CASCADE)
    Role = models.ForeignKey(Role,on_delete=models.CASCADE,related_name='userrole')