<script lang="ts">
  import { Button, SectionHeadline } from "$components";

  let contactName = $state();
  let contactEmail = $state();
  let contactMessage = $state();
  // EDITING, SENDING, SENT, INVALID, ERROR
  let progress = $state("EDITING");
  let isFormInvalid = $derived(progress === "INVALID");

  async function onSubmit(event: Event) {
    event.preventDefault();

    if (contactName && contactEmail && contactMessage) {
      try {
        progress = "SENDING";
        const response = await fetch("api/send-mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contactName, contactEmail, contactMessage }),
        });

        if (response.ok) {
          progress = "SENT";
        }
        else {
          throw new Error("server doesn't like you");
        }
      }
      catch (error) {
        progress = "ERROR";
        console.error("Error sending email:", error);
      }
    }
    else {
      progress = "INVALID";
    }
  }

  $effect(() => {
    if (contactName || contactEmail || contactMessage) {
      progress = "EDITING";
    }
  });
</script>

<section class="mt-l">
  <SectionHeadline sectionName="contact-form">Contact</SectionHeadline>
  <div class="form-container default-margin mt-m">
    {#if progress === "SENT"}
      <div class="form-text sent">
        <p>Thanks for your message! I'll get back to you as soon as possible.</p>
      </div>
    {/if}

    {#if progress === "SENDING"}
      <div class="spinner-container">
        <div class="spinner"></div>
        <p>Sending...</p>
      </div>
    {/if}

    {#if progress === "EDITING" || progress === "INVALID"}
      <form>
        <input type="text"
               class="text-input mb-m"
               class:input-error={isFormInvalid && !contactName}
               placeholder="Your Name"
               bind:value={contactName}
        />
        <input type="email"
               class="text-input mb-m"
               class:input-error={isFormInvalid && !contactEmail}
               placeholder="Your Email"
               bind:value={contactEmail}
        />
        <textarea placeholder="Tell me what's up"
                  class:input-error={isFormInvalid && !contactMessage}
                  bind:value={contactMessage}
        />
        <Button onclick={onSubmit}>Submit</Button>
      </form>
    {/if}

    {#if progress === "ERROR"}
      <div class="form-text error">
        <p>This form doesn't like you. Too bad.</p>
      </div>
    {/if}

    <div class="form-text">
      <div class="bold mb-s">Talk to me about your project</div>
      <p>
        Bacon ipsum dolor amet meatball flank pastrami, beef ribs capicola tail andouille kevin spare ribs picanha. Burgdoggen pork t-bone swine pancetta, meatball tri-tip. Turkey corned beef strip steak, boudin tenderloin chicken short ribs shankle picanha ham hock pork loin pig beef ribs. Filet mignon salami alcatra hamburger swine.
      </p>
    </div>
  </div>
</section>

<style>
  section {
    padding-bottom: 140px;
  }

  .form-container {
    display: flex;
    justify-content: space-between;
  }

  .form-text {
    width: 39%;
    text-align: left;
  }

  form {
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  form * {
    font-size: 20px;
    font-family: 'Inter-Tight', sans-serif;
    font-weight: 500;
    color: black;
  }

  textarea {
    height: 120px;
    width: 100%;
    margin-bottom: 40px;
  }

  textarea::placeholder, input::placeholder {
    font-size: 20px;
    font-weight: 400;
  }

  textarea, input {
    height: 48px;
    width: 100%;
    background-color: lightgray;
    border-radius: 4px;
    padding: 4px 12px;
    outline: none;
    border: none;
  }

  .input-error {
    background-color: rgba(198, 62, 62, 0.682);
  }

  .sent {
    background-color: rgb(105, 165, 105);
    border-radius: 4px;
    color: white;
    display: grid;
    place-items: center;
  }

  .error {
    background-color: rgba(198, 62, 62, 0.682);
    border-radius: 4px;
    color: white;
    display: grid;
    place-items: center;
  }

  .input-error::placeholder {
    color: white;
  }

  .spinner {
    border: 4px solid lightgray;
    border-left-color: black;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 8px;
    animation: spin 1s linear infinite;
  }

  .spinner-container {
    display: flex;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
