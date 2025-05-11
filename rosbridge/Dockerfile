# Utiliser une image officielle de Node.js
FROM registry-smr.norcan-group.com/infra/official-images/ros:jazzy

# Installer les dépendances
RUN apt update \
    && apt install -y \
        ros-jazzy-rosbridge-server \
        ros-jazzy-rmw-cyclonedds-cpp \
        ros-jazzy-rmw-zenoh-cpp

# Exposer le port 5000
EXPOSE 9090

# ros2 launch rosbridge_server rosbridge_websocket_launch.xml