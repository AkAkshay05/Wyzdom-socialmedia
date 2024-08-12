from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

class Follower(models.Model):
    follower = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='following', on_delete=models.CASCADE)
    followed = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='followers', on_delete=models.CASCADE)

    class Meta:
        unique_together = ['follower', 'followed']  # Prevents multiple follows by the same user to another user

    def __str__(self):
        return f'{self.follower} follows {self.followed}'
