job "orion-doc-production" {
  constraint {
    attribute = "${node.class}"
    value     = "nomad-client-5"
  }

  datacenters = ["dc1"]

  group "web" {
    count = 1

    network {
      mode = "bridge"
      port "http" {
        to = "80"
      }
    }

    service {
      name = "orion-doc-production"
      port = "http"
    }

    task "server" {
      resources {
        cpu    = 256
        memory = 256
      }

      driver = "docker"

      config {
        image = "gitlab.armado.fr:5050/armado/orion:production-{{orion-tag}}"
      }
    }
  }
}
