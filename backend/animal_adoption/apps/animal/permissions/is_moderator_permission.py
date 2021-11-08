from rest_framework.permissions import BasePermission

class IsModeratorPermission(BasePermission):
    message = 'Você precisa ser moderador para executar essa ação'

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.person.is_moderator)
