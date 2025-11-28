const API_BASE_URL = "http://localhost:8080/api";

const toast = {
  show: (message, type = "success") => {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toastId = "toast-" + Date.now();
    const styles = {
      success:
        "bg-emerald-500/20 border-emerald-500/50 text-emerald-100 shadow-emerald-500/10",
      error: "bg-red-500/20 border-red-500/50 text-red-100 shadow-red-500/10",
      info: "bg-blue-500/20 border-blue-500/50 text-blue-100 shadow-blue-500/10",
    };
    const iconColor = {
      success: "text-emerald-400",
      error: "text-red-400",
      info: "text-blue-400",
    };

    const toastElement = document.createElement("div");
    toastElement.id = toastId;
    toastElement.className = `glass flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg transform transition-all duration-500 animate-slide-in border backdrop-blur-md cursor-grab active:cursor-grabbing select-none pointer-events-auto ${styles[type]}`;
    toastElement.innerHTML = `
            <div class="p-1 bg-white/10 rounded-full ${iconColor[type]}">
                <i data-lucide="${
                  type === "success"
                    ? "check"
                    : type === "error"
                    ? "alert-triangle"
                    : "info"
                }" class="w-5 h-5"></i>
            </div>
            <span class="font-medium tracking-wide text-sm">${message}</span>
        `;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    const onDragStart = (e) => {
      isDragging = true;
      startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      toastElement.style.transition = "none";
    };

    const onDragMove = (e) => {
      if (!isDragging) return;
      const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const deltaX = x - startX;
      currentX = deltaX;

      if (deltaX > 0) {
        toastElement.style.transform = `translateX(${deltaX}px)`;
        toastElement.style.opacity = 1 - deltaX / 200;
      }
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      toastElement.style.transition = "all 0.3s ease";

      if (currentX > 100) {
        toastElement.style.transform = `translateX(100%)`;
        toastElement.style.opacity = "0";
        setTimeout(() => toastElement.remove(), 300);
      } else {
        toastElement.style.transform = "translateX(0)";
        toastElement.style.opacity = "1";
      }
    };

    toastElement.addEventListener("mousedown", onDragStart);
    toastElement.addEventListener("touchstart", onDragStart);

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("touchmove", onDragMove);

    document.addEventListener("mouseup", onDragEnd);
    document.addEventListener("touchend", onDragEnd);

    const cleanup = () => {
      document.removeEventListener("mousemove", onDragMove);
      document.removeEventListener("touchmove", onDragMove);
      document.removeEventListener("mouseup", onDragEnd);
      document.removeEventListener("touchend", onDragEnd);
    };

    container.appendChild(toastElement);
    lucide.createIcons();

    setTimeout(() => {
      if (document.body.contains(toastElement)) {
        toastElement.classList.add("opacity-0", "translate-x-full");
        toastElement.addEventListener("transitionend", () => {
          toastElement.remove();
          cleanup();
        });
      } else {
        cleanup();
      }
    }, 2500);
  },
};

if (!document.getElementById("toast-container")) {
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div id="toast-container" class="fixed top-6 right-6 z-50 space-y-3"></div>'
  );
}

const router = {
  navigate: (viewId) => {
    document.querySelectorAll(".view-section").forEach((el) => {
      el.classList.remove("active");
      el.classList.remove("animate-fade-in");
    });

    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.add("active");
      setTimeout(() => target.classList.add("animate-fade-in"), 10);
    }

    // Update Sidebar State
    document.querySelectorAll(".sidebar-link").forEach((el) => {
      el.classList.remove("active");
      el.classList.remove(
        "bg-gradient-to-r",
        "from-indigo-500/10",
        "to-purple-500/10",
        "text-indigo-400",
        "border-r-4",
        "border-indigo-500"
      );
      el.classList.add("text-slate-400", "hover:bg-slate-800/50");
    });

    const activeLink = document.getElementById(`nav-${viewId}`);
    if (activeLink) {
      activeLink.classList.remove("text-slate-400", "hover:bg-slate-800/50");
      activeLink.classList.add(
        "active",
        "bg-gradient-to-r",
        "from-indigo-500/20",
        "to-purple-500/20",
        "text-indigo-400",
        "border-r-4",
        "border-indigo-500"
      );
    }

    if (viewId === "history") dataLoader.loadHistory();
  },
};
const serviceOrder = {
  items: [],

  addItem: () => {
    const descInput = document.getElementById("item-desc");
    const qtyInput = document.getElementById("item-qty");
    const priceInput = document.getElementById("item-price");

    const desc = descInput.value;
    const qty = parseFloat(qtyInput.value);
    const price = parseFloat(priceInput.value);

    if (!desc || !qty || !price) {
      toast.show("Preencha todos os campos do item!", "error");
      return;
    }

    const newItem = { id: Date.now(), desc, qty, price, total: qty * price };
    serviceOrder.items.push(newItem);

    descInput.value = "";
    qtyInput.value = "1";
    priceInput.value = "";
    descInput.focus();

    serviceOrder.renderTable();
  },

  removeItem: (id) => {
    serviceOrder.items = serviceOrder.items.filter((item) => item.id !== id);
    serviceOrder.renderTable();
  },

  finalize: async () => {
    const vehicleId = document.getElementById("os-vehicle-select").value;
    const mechanicId = document.getElementById("os-mechanic-select").value;

    if (!vehicleId || !mechanicId || serviceOrder.items.length === 0) {
      toast.show("Selecione um veículo, mecânico e adicione itens.", "error");
      return;
    }

    const orderData = {
      vehicleId,
      mechanicId,
      items: serviceOrder.items,
    };

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const result = await response.json();
    toast.show(result.message);

    if (response.ok) {
      serviceOrder.items = [];
      serviceOrder.renderTable();
      document.getElementById("os-vehicle-select").value = "";
      document.getElementById("os-mechanic-select").value = "";
    }
  },

  renderTable: () => {
    const tbody = document.querySelector("#order-table tbody");
    tbody.innerHTML = "";

    if (serviceOrder.items.length === 0) {
      tbody.innerHTML = `
                <tr id="empty-row">
                    <td colspan="5" class="px-6 py-12 text-center text-slate-500 text-sm italic">Nenhum item adicionado à ordem de serviço.</td>
                </tr>`;
      document.getElementById("order-total").innerText = "R$ 0.00";
      return;
    }

    let totalOrder = 0;

    serviceOrder.items.forEach((item) => {
      totalOrder += item.total;
      const tr = document.createElement("tr");
      tr.className =
        "hover:bg-indigo-500/10 transition-colors group border-b border-slate-700/50 last:border-0";
      tr.innerHTML = `
                <td class="px-6 py-4 text-sm text-slate-300 font-medium">${
                  item.desc
                }</td>
                <td class="px-6 py-4 text-center text-sm text-slate-400">${
                  item.qty
                }</td>
                <td class="px-6 py-4 text-right text-sm text-slate-400">R$ ${item.price.toFixed(
                  2
                )}</td>
                <td class="px-6 py-4 text-right text-sm font-bold text-indigo-400">R$ ${item.total.toFixed(
                  2
                )}</td>
                <td class="px-6 py-4 text-center">
                    <button onclick="serviceOrder.removeItem(${
                      item.id
                    })" class="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-all transform hover:scale-110 shadow-sm">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </td>
            `;
      tbody.appendChild(tr);
    });

    document.getElementById("order-total").innerText = `R$ ${totalOrder.toFixed(
      2
    )}`;

    lucide.createIcons();
  },
};

const dataLoader = {
  loadInitialData: async () => {
    try {
      const [mechanicsRes, vehiclesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/mechanics`),
        fetch(`${API_BASE_URL}/vehicles`),
      ]);
      const mechanics = await mechanicsRes.json();
      const vehicles = await vehiclesRes.json();

      dataLoader.renderMechanics(mechanics);
      dataLoader.populateSelects(mechanics, vehicles);
    } catch (error) {
      toast.show("Falha ao carregar dados iniciais.", "error");
      console.error(error);
    }
  },

  renderMechanics: (mechanics) => {
    const container = document.querySelector("#mechanics-list-container .grid");
    container.innerHTML = "";
    mechanics.forEach((mec) => {
      const card = document.createElement("div");
      card.className =
        "glass-panel p-5 rounded-2xl flex flex-col justify-between hover-lift group transition-all duration-300 border border-slate-700/50";
      card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                            <i data-lucide="user" class="w-6 h-6"></i>
                        </div>
                        <div class="ml-3">
                            <h4 class="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">${mec.nome}</h4>
                            <p class="text-xs text-slate-500 font-medium">ID: ${mec.id}</p>
                        </div>
                    </div>
                    <span class="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-lg font-bold border border-indigo-500/20 uppercase tracking-wider">${mec.especialidade}</span>
                </div>
                <div class="mt-4 pt-4 border-t border-slate-700/50 flex items-center text-xs text-slate-500 font-medium">
                    <i data-lucide="shield-check" class="w-3 h-3 mr-1.5 text-emerald-500"></i> Ativo
                </div>`;
      container.appendChild(card);
    });
    lucide.createIcons();
  },

  populateSelects: (mechanics, vehicles) => {
    const mecSelect = document.getElementById("os-mechanic-select");
    const vehSelect = document.getElementById("os-vehicle-select");
    const mecFirst = mecSelect.firstElementChild;
    const vehFirst = vehSelect.firstElementChild;
    mecSelect.innerHTML = "";
    vehSelect.innerHTML = "";
    mecSelect.appendChild(mecFirst);
    vehSelect.appendChild(vehFirst);

    mechanics.forEach(
      (mec) =>
        (mecSelect.innerHTML += `<option value="${mec.id}">${mec.nome}</option>`)
    );
    vehicles.forEach(
      (veh) =>
        (vehSelect.innerHTML += `<option value="${veh.placa}">${veh.placa} - ${veh.modelo}</option>`)
    );
  },

  loadHistory: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      const orders = await response.json();
      const tbody = document.getElementById("history-table-body");
      tbody.innerHTML = "";
      orders.forEach((order) => {
        const statusColor =
          order.status === "Concluído"
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-blue-500/10 text-blue-400 border border-blue-500/20";
        const tr = document.createElement("tr");
        tr.className =
          "hover:bg-indigo-500/10 transition-colors group border-b border-slate-700/50 last:border-0";
        tr.innerHTML = `
                    <td class="px-6 py-4 text-sm font-bold text-indigo-400">#${
                      order.id
                    }</td>
                    <td class="px-6 py-4 text-sm text-slate-400 font-medium flex items-center">
                        <i data-lucide="calendar" class="w-3 h-3 mr-2 text-slate-500"></i> ${
                          order.data
                        }
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-300 font-medium">${
                      order.veiculo
                    }</td>
                    <td class="px-6 py-4 text-sm font-bold text-slate-200 text-right">R$ ${order.total.toFixed(
                      2
                    )}</td>
                    <td class="px-6 py-4 text-center"><span class="${statusColor} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">${
          order.status
        }</span></td>
                `;
        tbody.appendChild(tr);
      });
      lucide.createIcons();
    } catch (error) {
      toast.show("Falha ao carregar histórico.", "error");
    }
  },
};

const formHandler = {
  init: () => {
    const vehicleForm = document.getElementById("form-vehicle");
    if (vehicleForm) {
      vehicleForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(vehicleForm);
        const vehicleData = Object.fromEntries(formData.entries());
        vehicleData.ano = parseInt(vehicleData.ano); // Convert to number

        try {
          const response = await fetch(`${API_BASE_URL}/vehicles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehicleData),
          });
          const result = await response.json();
          toast.show(result.message);
          if (response.ok) vehicleForm.reset();
        } catch (err) {
          toast.show("Erro ao salvar veículo", "error");
        }
      });
    }

    const mechanicForm = document.getElementById("form-mechanic");
    if (mechanicForm) {
      mechanicForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(mechanicForm);
        const mechanicData = Object.fromEntries(formData.entries());

        try {
          const response = await fetch(`${API_BASE_URL}/mechanics`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mechanicData),
          });
          const result = await response.json();
          toast.show(result.message);
          if (response.ok) {
            mechanicForm.reset();
            const mechanicsRes = await fetch(`${API_BASE_URL}/mechanics`);
            const mechanics = await mechanicsRes.json();
            dataLoader.renderMechanics(mechanics);
          }
        } catch (err) {
          toast.show("Erro ao salvar mecânico", "error");
        }
      });
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  dataLoader.loadInitialData();

  formHandler.init();

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});
